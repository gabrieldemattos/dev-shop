"use server";

import { db } from "@/app/_lib/prisma";

export const fetchAllCategories = async (
  pageNumber: number,
  pageSizeNumber: number,
  searchQuery: string,
) => {
  const categories = await db.category.findMany({
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { slug: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
  });

  const totalCategories = await db.category.count({
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { slug: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
  });

  return {
    categories,
    totalCategories,
  };
};
