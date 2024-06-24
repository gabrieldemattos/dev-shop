"use server";

import { db } from "@/app/_lib/prisma";

export const searchProducts = async (query: string) => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
};
