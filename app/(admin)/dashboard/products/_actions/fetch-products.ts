"use server";

import { db } from "@/app/_lib/prisma";

export const getAllProducts = async (
  pageNumber: number,
  pageSizeNumber: number,
  searchQuery: string,
) => {
  const products = await db.product.findMany({
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { slug: { contains: searchQuery, mode: "insensitive" } },
        { category: { name: { contains: searchQuery, mode: "insensitive" } } },
      ],
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          reviews: true,
          orderProduct: true,
          usersWhoFavorited: true,
        },
      },
    },
  });

  const totalProducts = await db.product.count({
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { slug: { contains: searchQuery, mode: "insensitive" } },
        { category: { name: { contains: searchQuery, mode: "insensitive" } } },
      ],
    },
  });

  return {
    products: JSON.parse(JSON.stringify(products)),
    totalProducts,
  };
};
