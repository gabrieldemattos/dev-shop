"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

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

export const createReview = async (data: Prisma.ReviewCreateInput) => {
  await db.review.create({ data });

  await updateAverageRating(data.product.connect?.id as string);

  revalidatePath("/my-orders");
};
