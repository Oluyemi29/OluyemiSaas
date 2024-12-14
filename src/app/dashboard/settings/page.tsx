import SettingForm from "@/components/SettingForm";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
const page = async () => {
  noStore();
  const { userId } = await auth();
  const user = await currentUser();
  const userDatails = await prisma.user.findUnique({
    where: {
      id: userId as string,
      email: user?.emailAddresses[0].emailAddress as string,
    },
    select: {
      id: true,
      email: true,
      colorSchema: true,
      name: true,
    },
  });

  return (
    <div>
      <SettingForm
        name={userDatails?.name as string}
        email={userDatails?.email as string}
        colorScheme={userDatails?.colorSchema as string}
      />
    </div>
  );
};

export default page;
