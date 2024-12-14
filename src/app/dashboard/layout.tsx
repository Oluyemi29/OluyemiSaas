import DashboardNav from "@/components/DashboardNav";
import prisma from "@/lib/db";
import { stripe } from "@/lib/Stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React, { ReactNode } from "react";

const Dashboardlayout = async ({ children }: { children: ReactNode }) => {
  noStore();
  const { userId } = await auth();
  const userDetails = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      stringCustomerId: true,
      email: true,
      id: true,
    },
  });
  if (!user) {
    const name = `${userDetails?.firstName ?? ""} ${
      userDetails?.lastName ?? ""
    }`;
    await prisma.user.create({
      data: {
        id: userId as string,
        email: userDetails?.emailAddresses[0].emailAddress as string,
        name: name,
      },
    });
  }
  if (!user?.stringCustomerId) {
    const data = await stripe.customers.create({
      email: userDetails?.emailAddresses[0].emailAddress,
    });
    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        stringCustomerId: data.id,
      },
    });
  }
  return (
    <div className="w-full flex gap-4 items-start">
      <div className="w-[30%] border-r-4 hidden md:block border-primary">
        <DashboardNav />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Dashboardlayout;
