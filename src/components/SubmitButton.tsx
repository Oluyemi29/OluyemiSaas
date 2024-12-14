"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button className="w-fit">
          Please wait <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save Now
        </Button>
      )}
    </div>
  );
};
