"use server";
import prisma from "@/lib/db";
import { stripe } from "@/lib/Stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOKS_SECRET as string
    );
  } catch (error: unknown) {
    console.log(error);
    return new Response("webhooks error");
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const user = await prisma.user.findUnique({
      where: {
        stringCustomerId: subscription.customer as string,
      },
    });

    if (!user) throw new Error("User not found");

    const userSUb = await prisma.subscription.findUnique({
      where: {
        userId: user.id as string,
      },
    });

    if (!userSUb) {
      await prisma.subscription.create({
        data: {
          stringSubscriptionId: subscription.id as string,
          userId: user.id as string,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
          planId: subscription.items.data[0].plan.id as string,
          interval: subscription.items.data[0].plan.interval as string,
        },
      });
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const user = await prisma.user.findUnique({
      where: {
        stringCustomerId: subscription.customer as string,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const stringSubscriptionId = subscription.id as string;
    const checkSub = await prisma.subscription.findUnique({
      where: {
        userId: user.id as string,
      },
    });
    if (checkSub) {
      await prisma.subscription.update({
        where: {
          stringSubscriptionId,
        },
        data: {
          planId: subscription.items.data[0].plan.id as string,
          currentPeriodEnd: subscription.current_period_end,
          currentPeriodStart: subscription.current_period_start,
          status: subscription.status,
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}
