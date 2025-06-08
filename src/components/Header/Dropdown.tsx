import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function DropdownMenuCheckboxes() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({
      callbackUrl: window.location.origin + "/login",
    });
  };

  return (
    <div className="flex  justify-start gap-2 items-start ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-start">
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
        <DropdownMenuContent className="w-40" align="center" forceMount>
          <DropdownMenuItem>
            <Link
              href="/profile"
              className="w-full text-[18px] flex justify-center items-center gap-2"
            >
              <FaUser /> User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/cart"
              className="w-full text-[18px] flex md:ml-2 items-center gap-2"
            >
              <FaShoppingCart /> Cart
            </Link>
          </DropdownMenuItem>

          {session?.user?.role === "admin" && (
            <>
            <DropdownMenuItem>
              <Link
                href="/new"
                className="w-full text-[18px] flex md:ml-2 items-center gap-2"
              >
                add new
              </Link>
            </DropdownMenuItem>
                  
            
            </>
            
          )}

          <DropdownMenuItem>
            <Button
              className="cursor-pointer text-[18px] justify-center mx-auto"
              onClick={handleSignOut}
            >
              <FaSignOutAlt /> Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
