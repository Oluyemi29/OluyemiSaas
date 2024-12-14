"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { createSubscription } from "@/app/api/action";
import { Loader2 } from "lucide-react";

const BillingForm = () => {
  const { pending } = useFormStatus();
  const createSub = async () => {
    await createSubscription();
  };
  
  return (
    <div className="w-full">
      <form onSubmit={createSub} action="" method="post">
        {pending ? (
          <Button className="w-full" disabled>Please wait <Loader2 /></Button>
        ) : (
          <Button className="w-full" type="submit">Create Subscription</Button>
        )}
      </form>
    </div>
  );
};

export default BillingForm;
