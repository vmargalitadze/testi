"use client";
import { Product } from "@/interfaces";
import React from "react";
import {
  decrement,
  increment,
  makeProductQtyInCartSelector,
} from "@/components/Slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "./Button";
import QtyBtn from "./QtyBtn";

interface Props {
  product: Product;
}

const AddToCartBtn = (props: Props) => {
  const selector = React.useMemo(
    () => makeProductQtyInCartSelector(Number(props.product.id)),
    [props.product.id]
  );
  const qty = useAppSelector(selector);
  const dispatch = useAppDispatch();

  if (!qty)
    return (
      <div className="flex justify-center">
        <Button className="cursor-pointer w-full text-[18px] font-bold hover:text-amber-400  uppercase" onClick={() => dispatch(increment(props.product))}>
          Add To Cart
        </Button>
      </div>
    );

  return (
    <QtyBtn
      onDecrease={() => dispatch(decrement(props.product))}
      onIncrease={() => dispatch(increment(props.product))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;
