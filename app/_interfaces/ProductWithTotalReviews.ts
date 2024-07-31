import { Prisma } from "@prisma/client";

export interface IProductWithTotalReviews
  extends Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }> {
  totalReviews: number;
}
