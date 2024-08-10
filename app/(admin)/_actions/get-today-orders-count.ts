"use server";

import { db } from "@/app/_lib/prisma";

export const getTodayOrdersCount = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ordersCount = await db.order.count({
    where: {
      createdAt: {
        gte: today,
      },
      status: {
        notIn: ["CANCELLED", "WAITING_FOR_PAYMENT"],
      },
    },
  });

  return ordersCount;
};
