"use server";

import { db } from "../../_lib/prisma";

export const getUserLikedReviews = async (userId: string) => {
  if (!userId) return [];

  const likedReviews = await db.reviewLike.findMany({
    where: {
      userId: userId,
    },
    select: {
      reviewId: true,
    },
  });

  return likedReviews.map((like) => like.reviewId);
};
