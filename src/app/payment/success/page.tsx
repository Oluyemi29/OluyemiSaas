import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] p-5">
        <div>
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 p-2" />
          </div>
          <div className=" mt-3 text-center  sm:mt-5 w-full">
            <h1 className="text-lg leading-6 mt-4 font-medium">
              Payment Successfull
            </h1>
            <p className="text-sm mt-5 text-muted-foreground ">
              Congratulation on your subscrition
            </p>
            <div className="mt-5">
              <Link href={"/dashboard"}>
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
