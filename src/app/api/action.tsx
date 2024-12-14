"use server";
import { cardEditProps } from "@/components/NewCardEdit";
import prisma from "@/lib/db";
import { getStripeSession, stripe } from "@/lib/Stripe";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

type userProps = {
  id: string;
  color: string;
  name: string;
  email: string;
};
export const updateUser = async ({ id, color, name, email }: userProps) => {
  await prisma.user.update({
    where: {
      id,
      email,
    },
    data: {
      name,
      colorSchema: color,
    },
  });
  revalidatePath("/", "layout");
};

export const createSubscription = async () => {
  noStore();
  const { userId } = await auth();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      stringCustomerId: true,
    },
  });
  if (!dbUser?.stringCustomerId) {
    throw new Error("unable to get customers Id");
  }
  const SubscriptionUrl = await getStripeSession({
    customerId: dbUser.stringCustomerId as string,
    domainUrl: "http://localhost:3000",
    priceId: process.env.PRICE_ID as string,
  });
  return redirect(SubscriptionUrl);
};

export const createCustomerPortal = async () => {
  noStore();
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });
  const stringCustomerId = user?.stringCustomerId as string;
  const session = await stripe.billingPortal.sessions.create({
    customer: stringCustomerId,
    return_url: "http://localhost:3000/dashboard",
  });
  return redirect(session.url);
};

export const getNotes = async () => {
  noStore();
  const { userId } = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      note: true,
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });
  return user;
};

type NoteProps = {
  title: string;
  description: string;
};

export const CreateNote = async ({ title, description }: NoteProps) => {
  const { userId } = await auth();
  await prisma.note.create({
    data: {
      title,
      description,
      userId: userId as string,
    },
  });
  return redirect("/dashboard");
};

export const submitEdit = async ({ id, title, description }: cardEditProps) => {
  const { userId } = await auth();
  await prisma.note.update({
    where: {
      id,
      userId: userId as string,
    },
    data: {
      title,
      description,
    },
  });
  revalidatePath("/dashboard");
  return redirect("/dashboard");
};

export const deleteAction = async (id: string) => {
  const { userId } = await auth();
  await prisma.note.delete({
    where: {
      id,
      userId: userId as string,
    },
  });
  revalidatePath("/dashboard");
};
