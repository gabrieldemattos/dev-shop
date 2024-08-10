"use server";

import { Prisma } from "@prisma/client";
import { db } from "../../_lib/prisma";
import { revalidatePath } from "next/cache";

export const generateOrderNumber = async () => {
  let length = 5;
  let orderNumber = "";

  do {
    orderNumber = Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");
    const existingOrder = await db.order.findUnique({
      where: { orderNumber },
    });
    if (existingOrder) {
      length += 1;
    } else {
      break;
    }
  } while (true);

  return orderNumber;
};

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });

  revalidatePath("/my-orders");
};
