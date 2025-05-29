"use server";

import { convertToPlainObject, formatError } from "../utils";
import * as yup from "yup";
import { prisma } from "@/components/db/prisma";
import { revalidatePath } from "next/cache";

import { insertProductSchema, updateProductSchema } from "../validation";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products.map((product) => convertToPlainObject(product));
}

export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExist) throw new Error("not found");

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return {
      success: true,
      message: "deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createProduct(data: yup.InferType<typeof insertProductSchema>) {
  console.log("Received data before validation:", data);

  try {
    const product = await insertProductSchema.validate(data, { abortEarly: false });
    console.log("Validated product:", product);

    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    console.error("Error in createProduct:", error);
    return { success: false, message: formatError(error) };
  }
}


export async function updateProduct(data: yup.InferType<typeof updateProductSchema>) {
  try {
    const product = await updateProductSchema.validate(data, { abortEarly: false });

    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
