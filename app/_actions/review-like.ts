"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const likeReview = async (
  userId: string,
  reviewId: string,
  categorySlug: string,
  productSlug: string,
) => {
  if (!userId) return;

  const alreadyLiked = await db.reviewLike.findUnique({
    where: {
      userId_reviewId: {
        userId: userId,
        reviewId: reviewId,
      },
    },
  });

  if (!alreadyLiked) {
    await db.$transaction([
      db.reviewLike.create({
        data: {
          userId: userId,
          reviewId: reviewId,
        },
      }),

      db.review.update({
        where: { id: reviewId },
        data: { likeCount: { increment: 1 } },
      }),
    ]);

    revalidatePath(`/product/${categorySlug}/${productSlug}`);
  } else {
    console.log("Usuário já curtiu essa avaliação.");
  }
};
