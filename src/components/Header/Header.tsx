"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchHelper from './SearchHelper';
import Button from './Button';
import DropdownMenuCheckboxes from './Dropdown';
import Toggle from './toggle';

function Header() {
  const {  status } = useSession();

  return (
    <header className="bg-[#232F3E] sticky top-0 z-50 text-white">
      <div className="px-5">
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
            <Toggle />
            { status === "authenticated" ? (
              <DropdownMenuCheckboxes />
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
