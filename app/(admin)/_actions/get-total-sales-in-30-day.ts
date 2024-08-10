"use server";

import { db } from "@/app/_lib/prisma";

export const getTotalSalesIn30Days = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const totalSales = await db.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
      status: {
        notIn: ["CANCELLED", "WAITING_FOR_PAYMENT"],
      },
    },
  });

  return totalSales._sum.totalPrice || 0;
};
