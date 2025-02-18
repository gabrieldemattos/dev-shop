"use server";

import { db } from "@/app/_lib/prisma";

export const getRecentUserCount = async (days: number) => {
  const today = new Date();
  const pastDate = new Date(today);

  pastDate.setDate(today.getDate() - days);

  const userCount = await db.user.count({
    where: {
      createdAt: {
        gte: pastDate,
      },
    },
  });

  return userCount;
};
