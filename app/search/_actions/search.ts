"use server";

import { db } from "@/app/_lib/prisma";

export const searchProducts = async (query: string) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: query,
              mode: "insensitive",
            },
            OR: [
              {
                slug: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });

  return JSON.parse(JSON.stringify(products));
};
