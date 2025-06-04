/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Items from "./Items";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Navlist({ open, setOpen }: any) {
  const router = useRouter();
  const handleCategoryChange = (item: {
    id?: string;
    text?: string;
    href: any;
  }) => {
    setOpen(item);
    router.push(item.href);
  };
  return (
    <>
      {Items.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          onClick={() => handleCategoryChange(item)}
          className={`outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
          
            text-[18px] 
            hover:text-amber-400
            ${open === item ? "text-amber-400 " : "text-white"}`}
        >
          {item.text}
        </Link>
      ))}
    </>
  );
}

export default Navlist;
