import { Prisma } from "@prisma/client";

export type IProduct = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        slug: true;
        name: true;
      };
    };
    _count: {
      select: {
        reviews: true;
        orderProduct: true;
        usersWhoFavorited: true;
      };
    };
  };
}>;
