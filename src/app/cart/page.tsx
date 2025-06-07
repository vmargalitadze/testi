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
    <div className="container uppercase mx-auto px-4 mt-10">
      <div className="flex flex-col lg:flex-row gap-8 shadow-md my-10">
        <div className="w-full lg:w-3/4 bg-white rounded-lg p-4 lg:p-10">
          <div className="flex flex-col sm:flex-row justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl mb-4 sm:mb-0">Buy</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          
          {/* Headers - Hidden on Mobile */}
          <div className="hidden sm:flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              subtotal
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
            <span className="font-semibold text-sm">total:</span>
            <span className="font-semibold text-lg">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="py-6">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              promo code
            </label>
            <input
              readOnly
              type="text"
              id="promo"
              placeholder="enter your code"
              className="p-2 text-sm w-[240px] uppercase border rounded"
            />
          </div>
          <button className="
 
        bg-black text-white cursor-pointer hover:bg-gray-800 hover:text-amber-400 shadow shadow-gray-600/25 hover:shadow-gray-600/75  transition duration-500  py-2 px-4  rounded-md active:scale-95  w-[240px] text-[18px]  uppercase ">
           use
          </button>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-black w-[240px] cursor-pointer font-semibold hover:bg-gray-800 hover:text-amber-400 py-3 text-sm text-white uppercase rounded transition duration-200"
            >
              buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
