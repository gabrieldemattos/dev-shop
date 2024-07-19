"use server";

import { db } from "../_lib/prisma";

export const getUserActiveAddress = async (userId: string | undefined) => {
  if (!userId) return;

  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      address: {
        where: {
          active: true,
        },
      },
    },
  });
};
