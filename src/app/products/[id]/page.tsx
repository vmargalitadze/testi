import Image from "next/image";

import React from "react";
import { getProductById } from "@/lib/actions/product.actions";
import { Decimal } from "@prisma/client/runtime/library";
import AddToCartBtn from "@/utils/AddToCartBtn";

interface Product {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  images: string[];
}

const DetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const product = (await getProductById(id)) as Product;

  if (!product) {
    return (
      <div className="mt-20 mb-20 container mx-auto">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 mb-20">
        <div className="container">
          <div className="mx-auto flex justify-between gap-6 lg:gap-8 flex-col lg:flex-row">
            <div className="lg:w-[58%]">
              <Image
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.name}
                width={1200}
                height={500}
                className="object-cover rounded-md"
              />
            </div>
            <div className="lg:max-w-[635px] uppercase w-full">
              <div className="pb-4 sm:pb-6 border-b border-bdr-clr border-bdr-clr-drk">
                <h2 className="font-semibold pb-5 text-3xl leading-none tracking-tight text-title">
                  {product.name}
                </h2>

                <p className="text-2xl  pb-5 sm:text-3xl leading-none block">
                  price: ${Number(product.price).toFixed(2)}
                </p>

                <p className="text-base pb-5 uppercase md:text-lg leading-6 font-normal text-title mt-2">
                  {product.description}
                </p>
              </div>

              <div className="py-5 sm:py-6">
                <div className="flex  items-center gap-3"></div>

                <div className="flex gap-5 w-[250px] mt-4 sm:mt-6">
                  <div className="w-full">
                    <AddToCartBtn product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
