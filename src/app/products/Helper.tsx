"use client"
import { useState } from "react";

export default function QuantityControl() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="inc-dec flex items-center gap-2">
        <div className="dec w-8 h-8 flex items-center justify-center">
          <button className="cursor-pointer" onClick={decrement}>
            <span className="text-2xl"> - </span>
          </button>
        </div>
      </div>

      <div>{quantity}</div>

      <div className="inc w-8 h-8 flex items-center justify-center">
        <button className="cursor-pointer" onClick={increment}>
          <span className="text-2xl"> + </span>
        </button>
      </div>
    </div>
  );
}
