"use server";

import { db } from "@/app/_lib/prisma";

export const getOrderByQuery = async (query: string) => {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        { user: { name: { contains: query, mode: "insensitive" } } },
        { user: { email: { contains: query, mode: "insensitive" } } },
        { orderNumber: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      products: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return JSON.parse(JSON.stringify(orders));
};
