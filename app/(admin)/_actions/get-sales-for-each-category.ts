"use server";

import { subDays } from "date-fns";
import { db } from "@/app/_lib/prisma";

export const getSalesForEachCategory = async () => {
  const thirtyDaysAgo = subDays(new Date(), 30);

  const allCategories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const salesByCategory = await db.product.groupBy({
    by: ["categoryId"],
    where: {
      orderProduct: {
        some: {
          order: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
            status: {
              notIn: ["CANCELLED", "WAITING_FOR_PAYMENT"],
            },
          },
        },
      },
    },
    _sum: {
      basePrice: true,
    },
    _count: {
      id: true,
    },
  });

  const results = allCategories.map((category) => {
    const salesData = salesByCategory.find(
      (sale) => sale.categoryId === category.id,
    );

    return {
      categoryId: category.id,
      categoryName: category.name,
      totalSales: Number(salesData?._sum.basePrice) || 0,
      productsSold: salesData?._count.id || 0,
    };
  });

  return results;
};
