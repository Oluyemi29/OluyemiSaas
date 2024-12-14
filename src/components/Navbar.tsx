"use client";
import React from "react";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { AlignRight, CreditCard, Home, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathName = usePathname();
  const { userId } = useAuth();
  return (
    <div className="container flex justify-between p-4 shadow-sm">
      <div>
        <Link href={"/"}>
          <h1 className="font-extrabold text-2xl">
            Oluyemi<span className="text-primary">Saas</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        {userId ? (
          <UserButton />
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button>Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
              {" "}
              <h1>
                <Button variant={"secondary"}>Sign Up</Button>
              </h1>
            </Link>
          </>
        )}
        {userId && pathName.includes("/dashboard") && (
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AlignRight className="text-primary cursor-pointer transition" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-max relative">
                <Link href={"/dashboard"}>
                  <DropdownMenuCheckboxItem className="hover:bg-slate-50 flex gap-4">
                    <Home size={17} className="text-primary" />
                    Home
                  </DropdownMenuCheckboxItem>
                </Link>
                <Link href={"/dashboard/settings"}>
                  <DropdownMenuCheckboxItem className="hover:bg-slate-50 flex gap-4">
                    <Settings size={17} className="text-primary" />
                    Settings
                  </DropdownMenuCheckboxItem>
                </Link>
                <Link href={"/dashboard/billing"}>
                  <DropdownMenuCheckboxItem className="hover:bg-slate-50 flex gap-4">
                    <CreditCard size={17} className="text-primary" />
                    Billing
                  </DropdownMenuCheckboxItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
