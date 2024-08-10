"use server";

import { db } from "@/app/_lib/prisma";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

export const getSalesForLast6Months = async () => {
  const salesData = [];

  for (let i = 0; i < 6; i++) {
    const startDate = startOfMonth(subMonths(new Date(), i));
    const endDate = endOfMonth(subMonths(new Date(), i));

    const salesCount = await db.order.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          notIn: ["CANCELLED", "WAITING_FOR_PAYMENT"],
        },
      },
    });

    salesData.push({
      month: startDate.toLocaleString("default", { month: "long" }),
      year: startDate.getFullYear(),
      salesCount,
    });
  }

  return salesData.reverse();
};
