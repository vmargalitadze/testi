"use client";

import * as yup from "yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/actions/product.actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloudinaryUploader from "./CloudinaryUploader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { productSchema } from "@/lib/validation";

type ProductFormValues = yup.InferType<typeof productSchema>;

export default function NewPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      images: [],
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setError(null);
   


      const formData = {
        ...data,
        images: data.images.filter(
          (url): url is string => typeof url === "string"
        ),
      };

      const res = await createProduct(formData);
   

      if (res.success) {
        form.reset();
        router.push("/");
        router.refresh();
      } else {
        setError(res.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Product price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <CloudinaryUploader
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
