"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function Toggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button className="w-5 cursor-pointer h-5 text-white flex items-center justify-center p-0 m-0 bg-transparent">
          {theme === "dark" ? (
            <MoonIcon className="w-5 h-5 text-white" />
          ) : (
            <SunIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuCheckboxItem
          className="cursor-pointer text-[18px]"
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="cursor-pointer text-[18px]"
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Toggle;
