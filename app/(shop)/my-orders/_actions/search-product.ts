"use server";

import { db } from "@/app/_lib/prisma";

export const searchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};
