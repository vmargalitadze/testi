"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions/product.actions";
import { Decimal } from "@prisma/client/runtime/library";

interface Product {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  images: string[];
}

function Api() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="mt-24 mb-14">
        <section className="mx-auto flex flex-col items-center px-4 max-w-7xl">
          <h2 className="text-2xl text-black lg:text-4xl 2xl:text-6xl font-bold mb-6 text-center mt-8">
            Products
          </h2>

          <div className="w-full flex flex-wrap gap-6 justify-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-8 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full max-w-xs"
              >
                <div className="w-full h-64 mb-4 relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </Link>
                </div>

                <div className="flex flex-col text-center justify-between">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-sans text-[24px] font-bold">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="text-[20px] mt-2 font-bold font-mono">
                    price: ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Api;
