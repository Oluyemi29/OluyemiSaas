"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "./SubmitButton";
import { useAuth } from "@clerk/nextjs";
import { updateUser } from "@/app/api/action";
import toast from "react-hot-toast";

export const colors = [
  { key: "theme-green", label: "Green" },
  { key: "theme-blue", label: "Blue" },
  { key: "theme-violet", label: "Violet" },
  { key: "theme-orange", label: "Orange" },
  { key: "theme-yellow", label: "Yellow" },
  { key: "theme-red", label: "Red" },
  { key: "theme-rose", label: "Rose" },
];
type SettingProps = {
  name: string;
  email: string;
  colorScheme: string;
};

// formshecma

const formScheme = z.object({
  name: z.string(),
  color: z.string(),
});

export type formSchemeType = z.infer<typeof formScheme>;

const SettingForm = ({ email, name, colorScheme }: SettingProps) => {
  const { userId } = useAuth();
  const id = userId as string;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
  });
  const submit = async (data: formSchemeType) => {
    const { color, name } = data;
    await updateUser({ id, color, name, email });
    toast.success("user updated successfully");
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold text-2xl">Settings</h1>
        <h1 className="font-medium text-muted-foreground">
          Your Profile Settings
        </h1>
      </div>
      <div className="mt-7 mx-4 border-2 border-gray-200 rounded-lg p-5">
        <h1 className="font-semibold text-xl">General Data</h1>
        <h4 className="font-semibold text-muted-foreground">
          Pls provide general information about yourself, and dont forget to
          save
        </h4>
        <div>
          <form
            method="post"
            onSubmit={handleSubmit(submit)}
            action=""
            className="flex flex-col gap-3 items-center"
          >
            <Input
              label="Name"
              type="text"
              className="bg-accent-foreground rounded-2xl"
              defaultValue={name}
              {...register("name")}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />
            <Input
              label="Email"
              type="email"
              className="bg-accent-foreground rounded-2xl"
              disabled
              defaultValue={email}
            />
            <Select
              className="w-full"
              label="Color Scheme"
              placeholder="Select color scheme"
              selectionMode={"single"}
              defaultSelectedKeys={[colorScheme]}
              {...register("color")}
              errorMessage={errors.color?.message}
              isInvalid={!!errors.color}
            >
              {colors.map((color) => (
                <SelectItem key={color.key}>{color.label}</SelectItem>
              ))}
            </Select>
            <div className="flex justify-start w-full">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingForm;
