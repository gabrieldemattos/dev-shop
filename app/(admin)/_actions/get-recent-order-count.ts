"use server";

import { db } from "@/app/_lib/prisma";

export const getRecentOrderCount = async (days: number) => {
  const today = new Date();
  const pastDate = new Date(today);

  pastDate.setDate(today.getDate() - days);

  const userCount = await db.order.count({
    where: {
      createdAt: {
        gte: pastDate,
      },
      status: {
        notIn: ["CANCELLED", "WAITING_FOR_PAYMENT"],
      },
    },
  });

  return userCount;
};
