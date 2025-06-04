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
      <div className="mt-36 mb-14">
        <section className="mx-auto px-4 container">
          <h2 className="lg:text-5xl mb-6 xs:text-2xl text-center mt-8">
            პროდუქტები
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-8 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <div className="w-full h-64 mb-4 relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </Link>
                </div>

                <div className="flex justify-between">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-sans font-bold">{product.name}</h3>
                  </Link>
                  <span className="text-base font-mono">
                    ${Number(product.price).toFixed(2)}
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
