"use server";

import { convertToPlainObject, formatError } from "../utils";
import * as yup from "yup";
import { prisma } from "@/components/db/prisma";
import { revalidatePath } from "next/cache";
import { Product } from "@prisma/client";

import { productSchema } from "../validation";

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

    revalidatePath("/");
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

type ProductInput = yup.InferType<typeof productSchema>;

export async function createProduct(data: ProductInput): Promise<{
  success: boolean;
  message: string;
  product?: Product;
  errors?: string[];
}> {
  try {


    const validatedData = await productSchema.validate(data, {
      abortEarly: false,
    });
 


    const images = validatedData.images.filter(
      (url): url is string => typeof url === "string"
    );

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        images,
      },
    });

  
    revalidatePath("/");
    return {
      success: true,
      message: "Product created successfully",
      product: convertToPlainObject(product),
    };
  } catch (error) {
    console.error("Error creating product:", error);

    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        message: "Validation error",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Failed to create product",
    };
  }
}
