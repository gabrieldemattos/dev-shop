"use server";

import { db } from "@/app/_lib/prisma";

export const getInactiveProductInOrder = async (productId: string) => {
  return await db.product.findUnique({
    where: {
      id: productId,
      status: "INACTIVE",
    },
    select: {
      id: true,
    },
  });
};
