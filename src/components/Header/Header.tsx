"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {  FaUser, FaShoppingCart } from 'react-icons/fa';
import SearchHelper from './SearchHelper';
import Button from './Button';
function Header() {
  return (
    <header className="bg-[#232F3E] sticky top-0 z-50 text-white">
      
 


      <div className="flex items-center justify-between px-4 py-3 bg-amazonBlue">
        
      
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={70}
              height={70}
              className="object-contain"
              priority
            />
          </Link>
         <Button />
        </div>

        <div className="flex items-center gap-6">
       <SearchHelper />

      
      

          <Link href='/cart' className="flex items-center gap-1 hover:text-white">
            <FaShoppingCart /> <span className="hidden ml-1 md:inline">კალათა</span>
          </Link>

          <Link href='/profile'  className="flex  items-center  gap-1 hover:text-white">
            <FaUser /> <span className="hidden   ml-1 md:inline">მომხმარებლები</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
