import { CartItem } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { decrement, increment, remove } from "@/components/Slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import QtyBtn from "@/utils/QtyBtn";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import { Button } from "@/utils/Button";  

interface Props {
  cartItem: CartItem;
}
const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(remove(cartItem.product));
  };

  return (
    <div className="flex items-center justify-center  -mx-8 px-6 py-5 border-b">
      <div className="flex w-2/5">
        <div className="w-20">
          <Image
            width={96}
            height={96}
            className="h-24"
            src={cartItem.product.images[0]}
            alt={"Product Image"}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <Link href={`/products/${cartItem.product.id}`}>
            <span className="font-bold text-sm">{cartItem.product.name}</span>
          </Link>
        </div>
      </div>

      <div className="w-1/5 flex justify-center">
        <QtyBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        />
      </div>

      <span className="text-center w-1/5 font-semibold text-sm">
        {cartItem.product.price.toString()}
      </span>

      <span className="text-center w-1/5 font-semibold text-sm">
        {(Number(cartItem.qty) * Number(cartItem.product.price)).toFixed(2)}
      </span>

    
      <div className="w-10 ">
        <Button
          onClick={handleRemove}
         
          className="cursor-pointer"
        >
          <FaTrash className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
