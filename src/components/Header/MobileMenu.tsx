/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Items from "./Items";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  
  const handleCategoryChange = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        className={`
          fixed inset-0 bg-gradient-to-b from-[#232F3E] to-[#1a2432]
          flex items-center justify-center
          transform transition-all duration-300 ease-in-out
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        {/* Close button in top right */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <nav className="flex flex-col items-center space-y-6 p-6">
          {Items.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              onClick={handleCategoryChange}
              className={`
                px-6 py-4 rounded-lg cursor-pointer
                text-[24px] font-medium text-white/90
                hover:bg-white/10 hover:text-white
                transition-all duration-200 ease-in-out
                text-center
              `}
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
