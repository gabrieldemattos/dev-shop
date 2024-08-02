import { Prisma } from "@prisma/client";
import { db } from "../../_lib/prisma";

export const fetchProductTotalReviews = async (
  products: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>[],
) => {
  const productsWithTotalReviews = await Promise.all(
    products.map(async (product) => {
      const totalReviews = await db.review.count({
        where: {
          productId: product.id,
        },
      });
      return {
        ...product,
        totalReviews,
      };
    }),
  );

  return productsWithTotalReviews;
};
