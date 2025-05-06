"use client";
import { useState, useEffect } from "react";
import React from "react";

import Link from "next/link";
import Image from "next/image";
function Api() {
  const [product, setProduct] = useState<
    { id: number; image: string; title: string }[]
  >([]);

  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="mt-36 mb-14">
        <section className="mx-auto px-  md: container lg: xl:container">
          <h2 className="lg:text-5xl mb-6 xs:text-2xl text-center mt-8">
            პროდუქტები
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {product.map((item) => (
              <div
                key={item.id}
                className="p-8 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <div className="w-full  h-64 mb-4 relative">

                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className=" object-cover rounded-lg"
                  />
                </Link>
                </div>

                <div className="flex justify-between">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-sans font-bold">{item.title}</h3>
                  </Link>
                  <span className="text-base font-mono">$49.90</span>
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
