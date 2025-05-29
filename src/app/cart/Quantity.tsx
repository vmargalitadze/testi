"use client";
import { useState } from "react";

function Quantity() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  return (
    <div className="flex justify-center w-1/5">
      <button className="cursor-pointer" onClick={decrement}>
        <span className="text-2xl"> - </span>
      </button>

      <div className="mx-2 border text-center w-8">{quantity}</div>

      <button className="cursor-pointer" onClick={increment}>
        <span className="text-2xl"> + </span>
      </button>
    </div>
  );
}

export default Quantity;
