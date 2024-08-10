import { db } from "@/app/_lib/prisma";
import { subDays, startOfDay, endOfDay } from "date-fns";

export const getNewUsersLast24Hours = async () => {
  const endDate = new Date();
  const startDate = subDays(endDate, 1);

  const newUsers = await db.user.findMany({
    where: {
      createdAt: {
        gte: startOfDay(startDate),
        lte: endOfDay(endDate),
      },
    },
  });

  return newUsers;
};
