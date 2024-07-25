"use server";

import { db } from "../_lib/prisma";

export const getOrderReview = async (
  userId: string,
  orderProductId: string,
  productId: string,
) => {
  if (!userId || !orderProductId) return;

  return await db.review.findFirst({
    where: {
      userId,
      orderProductId,
      productId,
    },
  });
};
