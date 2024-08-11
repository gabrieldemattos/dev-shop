"use server";

import { db } from "@/app/_lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateOrder = async (orderNumber: string, status: OrderStatus) => {
  await db.order.update({
    where: {
      orderNumber,
    },
    data: {
      status,
    },
  });

  revalidatePath("/dashboard/orders");
};
