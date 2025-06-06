"use client";

/* eslint-disable prefer-const */
import { useAppSelector } from "@/store/store";
import React from "react";
import CartItemCard from "./CartItem";
import { TotalPriceSelector } from "@/components/Slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
        console.error('შეცდომა გადახდისას:', errorData);
        return;
      }

      const { id: sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Stripe გადამისამართების შეცდომა:', error);
      }
    } catch (error) {
      console.error('გადახდის შეცდომა:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex flex-col lg:flex-row gap-8 shadow-md my-10">
        <div className="w-full lg:w-3/4 bg-white rounded-lg p-4 lg:p-10">
          <div className="flex flex-col sm:flex-row justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl mb-4 sm:mb-0">იყიდე</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} რაოდენობა</h2>
          </div>
          
          {/* Headers - Hidden on Mobile */}
          <div className="hidden sm:flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              დეტალები
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

          <div className="divide-y">
            {cartItems.map((item) => (
              <CartItemCard key={item.product.id} cartItem={item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/4 bg-white rounded-lg p-4 lg:p-8">
          <div className="flex justify-between mt-4 mb-5">
            <span className="font-semibold text-sm">ჯამური ფასი:</span>
            <span className="font-semibold text-lg">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="py-6">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              პრომო კოდი
            </label>
            <input
              readOnly
              type="text"
              id="promo"
              placeholder="შეიყვანეთ კოდი"
              className="p-2 text-sm w-full border rounded"
            />
          </div>
          <button className="bg-red-500 w-full cursor-pointer hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded transition duration-200">
            გამოიყენე
          </button>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>მთლიანი ფასი</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-indigo-500 w-full cursor-pointer font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase rounded transition duration-200"
            >
              შეძენა
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
