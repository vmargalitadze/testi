"use client";

/* eslint-disable prefer-const */
import { useAppSelector } from "@/store/store";
import React from "react";
import { TotalPriceSelector } from "@/components/Slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import CartItemCard from "./CartItem";


import { Button } from "@/components/ui/button";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(TotalPriceSelector);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe ვერ ჩაიტვირთა");
        return;
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(totalPrice),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("შეცდომა გადახდისას:", errorData);
        return;
      }

      const { id: sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe გადამისამართების შეცდომა:", error);
      }
    } catch (error) {
      console.error("გადახდის შეცდომა:", error);
    }
  };
 
  return (
    <div className="">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold uppercase text-2xl">
                Shopping Cart
              </h1>
              <h2 className="font-semibold text-2xl">{cartItems.length}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {cartItems.map((item) => (
              <CartItemCard key={item.product.id} cartItem={item} />
            ))}
            <Link
              href="/"
              className="inline-flex  items-center border border-black px-3 py-1.5 rounded-md text-black hover:bg-indigo-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
              </svg>
              <span className="ml-1 font-bold uppercase text-[18px]">Back</span>
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold uppercase text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cartItems.length}
              </span>
              <span className="font-semibold text-sm">
                {" "}
                <span>${totalPrice.toFixed(2)}</span>
              </span>
            </div>

            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3  uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 rounded-md border border-black uppercase text-sm w-full"
              />
            </div>
            <Button className="bg-black text-[18px] px-5 py-2  text-white cursor-pointer uppercase">
              Apply
            </Button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-[18px] uppercase">
                <span>Total cost</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="bg-black cursor-pointer text-[18px] font-semibold  py-3  text-white uppercase w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
