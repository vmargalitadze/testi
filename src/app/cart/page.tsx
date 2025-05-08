/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Page() {
  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }

  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/carts/2");
      const cart = await res.json();

      const productDetails = await Promise.all(
        cart.products.map(async (item: any) => {
          const res = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
          const data = await res.json();
          return {
            ...data,
            quantity: item.quantity,
          };
        })
      );

      setProduct(productDetails);
    };
    fetchProducts();
  }, []);

  const totalItems = product.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = product.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">იყიდე</h1>
            <h2 className="font-semibold text-2xl">{totalItems} რაოდენობა</h2>
          </div>

          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              რაოდენობა
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              ფასი
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              ჯამი
            </h3>
          </div>

          {product.map((item, index) => (
            <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <Image width={96} height={96}  src={item.image} alt={item.title} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.title}</span>
                  <span className="text-gray-500 text-xs">Product ID: {item.id}</span>
                  <a href="#" className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs">
                    Remove
                  </a>
                </div>
              </div>

              <div className="flex justify-center w-1/5">
                <input
                  readOnly
                  className="mx-2 border border-b-black text-center w-8"
                  type="text"
                  value={item.quantity}
                />
              </div>

              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">ჯამი</h1>

          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">სულ {totalItems}</span>
            <span className="font-semibold text-sm">₾{totalCost.toFixed(2)}</span>
          </div>

          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
              პრომო კოდი
            </label>
            <input
              readOnly
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>

          <button className="bg-red-500 cursor-pointer hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>მთლიანი ფასი</span>
              <span>₾{totalCost.toFixed(2)}</span>
            </div>
            <button className="bg-indigo-500 cursor-pointer font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
