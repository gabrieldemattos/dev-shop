"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toggleFavoriteProduct = async (
  productId: string,
  userId: string,
) => {
  const isFavorite = await db.userFavoriteProduct.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (isFavorite) {
    await db.userFavoriteProduct.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    revalidatePath("/");
    return true;
  }

  await db.userFavoriteProduct.create({
    data: {
      userId,
      productId,
    },
  });

  revalidatePath("/");
  return true;
};
