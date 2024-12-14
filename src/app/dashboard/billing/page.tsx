import BillingForm from "@/components/BillingForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateBillingForm from "@/components/UpdateBillingForm";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2 } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore();
  const { userId } = await auth();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId as string,
    },
  });

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-xl md:text-4xl">Subcription</h1>
            <h2 className="text-lg text-muted-foreground">
              Setting regarding your subscription
            </h2>
          </div>
        </div>
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click on the button below, this will give you the opportunity to
              change your payment details and view your statement at the same
              time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateBillingForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = [
    { name: "Let have it urgently" },
    { name: "Let have it urgently" },
    { name: "Let have it urgently" },
    { name: "Let have it urgently" },
  ];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              {" "}
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-5xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want for $30 a month
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-4 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-19 sm:pt-6">
          <ul className="space-y-4">
            {features.map((feature, index) => {
              return (
                <li key={index} className="flex items-center">
                  <div className="flex shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base">{feature.name}</p>
                </li>
              );
            })}
          </ul>
          <BillingForm />
        </div>
      </Card>
    </div>
  );
};

export default page;
