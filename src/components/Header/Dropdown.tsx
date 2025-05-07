"use client";
import {  FaUser, FaShoppingCart } from 'react-icons/fa';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function DropdownMenuCheckboxes() {
  return (
    <div className="flex gap-2 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              className="relative cursor-pointer w-10 h-10 rounded-full ml-2 overflow-hidden p-0"
              variant="ghost"
            >
              <Image
                src="/john.jpg"
                alt="logo"
                fill
                className="object-cover rounded-full"
              />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
        

          <DropdownMenuItem>
            <Link href="/profile" className="w-full flex justify-center items-center gap-2">
          <FaUser />    User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/cart" className="w-full flex justify-center items-center gap-2">
          <FaShoppingCart />      Cart
            </Link>
          </DropdownMenuItem>

      

      
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
