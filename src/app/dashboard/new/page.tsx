import NewNoteCard from "@/components/NewNoteCard";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  noStore();
  const { userId } = await auth();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId as string,
      status: "active",
    },
  });
  if (!data) {
    return redirect("/dashboard/billing");
  }
  return (
    <div>
      <NewNoteCard />
    </div>
  );
};

export default page;
