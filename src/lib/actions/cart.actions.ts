"use server";

import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";

import { auth } from "@/auth";
import { prisma } from "@/components/db/prisma";
import { cartItemSchema, insertCartSchema, CartItem } from "../validation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * (item.qty ?? 1), 0)
  );

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemCart(data: CartItem) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You must be logged in to add items to cart.");
    }

    const userId = session.user.id as string;

    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session cart not found");

    const cart = await getMyCart();

    const item = cartItemSchema.validateSync(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      const newCart = insertCartSchema.validateSync({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({ data: newCart });

      revalidatePath(`/product/${product.id}`);
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      const existItem = cart.items.find((x) => x.productId === item.productId);

      if (existItem) {
        existItem.qty = (existItem.qty ?? 0) + 1;
      } else {
        cart.items.push(item);
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items),
        },
      });

      revalidatePath(`/product/${product.id}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
export async function removeFromCart(productId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You must be logged in to remove items from cart.");
    }



    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session cart not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const exist = cart.items.find((x) => x.productId === productId);
    if (!exist) throw new Error("Item not found");

    if (exist.qty === 1) {
      cart.items = cart.items.filter((x) => x.productId !== exist.productId);
    } else {
      const item = cart.items.find((x) => x.productId === productId);
      if (item) item.qty = (item.qty ?? 1) - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/product/${product.id}`);
    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
export async function getMyCart() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to view cart.");
  }

  const userId = session.user.id as string;

  const cart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
