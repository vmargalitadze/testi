import React from "react";
import { Button } from "./Button";


interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}

const QtyBtn = ({ qty, onDecrease, onIncrease }: Props) => {
  return (
    <div className="flex items-center gap-2 border rounded-2xl px-3 py-1 bg-white shadow-sm">
      { (
        <Button
          variant="primary"
          onClick={onDecrease}
          className="rounded-full w-8 h-8 flex items-center justify-center p-0"
        >
          <span className="text-lg">− </span>
        </Button>
      ) }

      <span className="w-6 text-center font-medium text-sm">{qty}</span>

      <Button
        variant="success"
        onClick={onIncrease}
        className="rounded-full w-8 h-8 flex items-center justify-center p-0"
      >
        <span className="text-lg">+</span>
      </Button>
    </div>
  );
};

export default QtyBtn;
