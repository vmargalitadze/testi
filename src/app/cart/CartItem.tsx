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
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 py-6 px-2 sm:px-6">
      {/* Product Image and Name */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-2/5 gap-4">
        <div className="w-24 h-24 relative">
          <Image
            fill
            className="object-cover rounded-lg"
            src={cartItem.product.images[0]}
            alt={cartItem.product.name}
          />
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <Link href={`/products/${cartItem.product.id}`}>
            <span className="font-bold text-base text-center sm:text-left">
              {cartItem.product.name}
            </span>
          </Link>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center w-full sm:w-1/5">
        <QtyBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        />
      </div>

      {/* Price */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between w-full sm:w-2/5">
        <div className="flex items-center gap-2 sm:w-1/2">
          <span className="text-gray-600 text-sm sm:hidden">ფასი:</span>
          <span className="font-semibold text-base">
            ${cartItem.product.price.toString()}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:w-1/2">
          <span className="text-gray-600 text-sm sm:hidden">ჯამი:</span>
          <span className="font-semibold text-base">
            ${(Number(cartItem.qty) * Number(cartItem.product.price)).toFixed(2)}
          </span>
        </div>

        {/* Delete Button */}
        <Button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaTrash className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
