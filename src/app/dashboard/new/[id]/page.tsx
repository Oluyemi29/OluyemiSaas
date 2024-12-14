import NewCardEdit from "@/components/NewCardEdit";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

type newProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: newProps) => {
  noStore();
  const id = params.id as string;
  const { userId } = await auth();
  const user = await prisma.note.findUnique({
    where: {
      id,
      userId: userId as string,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  return (
    <div>
      <NewCardEdit
        id={user?.id as string}
        title={user?.title as string}
        description={user?.description as string}
      />
    </div>
  );
};

export default page;
