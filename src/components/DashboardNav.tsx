"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Home, LucideProps, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  }
];

type navItemProps = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const DashboardNav = () => {
  const pathName = usePathname();

  const trying = (Navy :navItemProps)=>{
    return `flex items-center justify-start py-2 px-3 rounded-md hover:bg-slate hover:text-black,
                ${pathName === Navy.href && "flex bg-slate font-bold items-center justify-start py-2 px-3 rounded-md"}`
  }

  return (
    <div className="grid items-start gap-2">
      {navItems.map((navItem: navItemProps, i: number) => {
        return (
          <div  key={i}>
            <Link
            //   className={
            //     pathName === navItem.href
            //       ? "flex bg-slate-100 font-bold items-center justify-start py-2 px-3 rounded-md"
            //       : "flex items-center justify-start py-2 px-3 rounded-md hover:bg-slate-100"
            //   }
            className={cn(trying(navItem))}
              href={navItem.href}
            >
              <navItem.icon className="mr-2 h-4 w-4 text-primary" /> {navItem.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardNav;
