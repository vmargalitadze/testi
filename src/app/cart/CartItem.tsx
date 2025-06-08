import { CartItem } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { decrement, increment, remove } from "@/components/Slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(remove(cartItem.product));
  };

  return (
    <div className="flex items-center   -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <Link href={`/product/${cartItem.product.id}`}>
            <Image
              width={80}
              height={96}
              className="h-24 rounded-md"
              src={cartItem.product.images[0]}
              alt={cartItem.product.name}
            />
          </Link>
          
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold uppercase text-sm">{cartItem.product.name}</span>
             <button
        onClick={handleRemove}
        className="flex p-2 items-center justify-center hover:text-amber-400 rounded-md w-[15%] bg-black cursor-pointer gap-1 font-semibold text-xs text-white  "
      >
        <FaTrash className="w-3.5 h-3.5" />
      </button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <svg
          onClick={() => dispatch(decrement(cartItem.product))}
          className="fill-current  w-3 cursor-pointer"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>

        <input
          className="mx-2 border rounded-md text-center w-8"
          type="text"
          value={cartItem.qty}
          readOnly
        />

        <svg
          onClick={() => dispatch(increment(cartItem.product))}
          className="fill-current  w-3 cursor-pointer"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <span className="text-center  w-1/5 font-semibold text-sm">
        ${cartItem.product.price.toString()}
      </span>
      <span className="text-center  w-1/5 font-semibold text-sm">
        ${(Number(cartItem.qty) * Number(cartItem.product.price)).toFixed(2)}
      </span>
   
    </div>
  );
};

export default CartItemCard;
