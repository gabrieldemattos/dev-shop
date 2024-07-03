"use server";

import { db } from "../_lib/prisma";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return categories;
};
