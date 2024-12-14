import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center md:w-[50%] w-full space-y-5">
        <h1 className="text-primary tracking-tight leading-3 py-2 px-3 rounded-lg bg-secondary w-max">
          Sort Your Notes Easily
        </h1>
        <h1 className="font-extrabold text-2xl">Create Note with Ease</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          aperiam temporibus? Odio expedita ipsam velit recusandae debitis sequi
          quos sint, animi id libero tempore suscipit natus. Nesciunt temporibus
          quidem odit numquam harum, nihil ipsam eveniet nisi natus laboriosam
          qui sequi vitae. Praesentium ab debitis id nam corporis asperiores
          error deleniti?
        </p>
        <div>
          {userId && (
            <Link href={"/dashboard"}>
              <Button size={"lg"} className="mt-3">
                welcome {user?.firstName}
              </Button>
            </Link>
          )}
          {!userId && (
            <Link href={"/sign-up"}>
              <Button size={"lg"} className="mt-3">
                {userId ? `welcome ${user?.firstName}` : "Sign Up For Free"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
