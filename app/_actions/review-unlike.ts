"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const unlikeReview = async (
  userId: string,
  reviewId: string,
  categorySlug: string,
  productSlug: string,
) => {
  const alreadyLiked = await db.reviewLike.findUnique({
    where: {
      userId_reviewId: {
        userId: userId,
        reviewId: reviewId,
      },
    },
  });

  if (alreadyLiked) {
    await db.$transaction([
      db.reviewLike.deleteMany({
        where: {
          userId: userId,
          reviewId: reviewId,
        },
      }),

      db.review.update({
        where: { id: reviewId },
        data: { likeCount: { decrement: 1 } },
      }),
    ]);

    revalidatePath(`/product/${categorySlug}/${productSlug}`);
  } else {
    console.log("Usuário não curtiu essa avaliação.");
  }
};
