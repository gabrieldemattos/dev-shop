"use server";

import { db } from "@/app/_lib/prisma";

const updateAverageRating = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: { productId },
    select: { rating: true },
  });

  const totalRatings = reviews.length;
  const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRatings ? sumRatings / totalRatings : 0;

  await db.product.update({
    where: { id: productId },
    data: { averageRating },
  });
};

export const deleteOrderAndUpdateRating = async (orderId: string) => {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      products: {
        include: { product: true },
      },
    },
  });

  if (!order) return;

  for (const orderProduct of order.products) {
    const review = await db.review.findFirst({
      where: {
        productId: orderProduct.productId,
        userId: order.userId,
      },
    });

    if (review) {
      await db.review.delete({
        where: { id: review.id },
      });

      await updateAverageRating(orderProduct.productId);
    }
  }

  await db.order.delete({
    where: { id: orderId },
  });
};
