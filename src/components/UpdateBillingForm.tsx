"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { createCustomerPortal } from "@/app/api/action";

const UpdateBillingForm = () => {
  const { pending } = useFormStatus();
  const handleSubmit = async ()=>{
    await createCustomerPortal()
  }
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        {pending ? (
          <Button disabled>
            Please wait <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit">View Payment Details</Button>
        )}
      </form>
    </div>
  );
};

export default UpdateBillingForm;
