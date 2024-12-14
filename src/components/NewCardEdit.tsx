"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { z } from "zod";
import { submitEdit } from "@/app/api/action";

export type cardEditProps = {
  id: string;
  title: string;
  description: string;
};
const NewCardEdit = ({ id, title, description }: cardEditProps) => {
  const formSchema = z.object({
    title: z.string().min(1, "must not be empty"),
    description: z.string().min(1, "must not be empty"),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (data: formSchemaType) => {
    const { title, description } = data;

    await submitEdit({ id, title, description });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(submit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
            <CardDescription>
              Right here u can now Edit your note
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Input
                label={"let see"}
                type="text"
                {...register("title")}
                errorMessage={errors.title?.message}
                isInvalid={!!errors.title}
                defaultValue={title}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Textarea
                label={"Describe your note as u want"}
                title="Description"
                type="text"
                {...register("description")}
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                defaultValue={description}
              />
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between items-center">
            <Link href={"/dashboard"}>
              {" "}
              <Button className="bg-red-600">Cancel</Button>
            </Link>
            <Button>Edit Now</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewCardEdit;
