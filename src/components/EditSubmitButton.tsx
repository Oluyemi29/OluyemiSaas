"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteAction } from "@/app/api/action";
import toast from "react-hot-toast";

const EditSubmitButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deleteAction(id);
    toast.success("delete Successfully");
  };
  return (
    <div>
      <form>
        {" "}
        <Button
          onClick={() => {
            handleDelete();
          }}
          type="button"
          className=""
          variant={"destructive"}
          size={"icon"}
        >
          <Trash className="w-4 h-4" />{" "}
        </Button>{" "}
      </form>
    </div>
  );
};

export default EditSubmitButton;
