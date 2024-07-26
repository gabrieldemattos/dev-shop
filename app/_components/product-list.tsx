import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";
import { authOptions } from "../_lib/auth";

const ProductList = async () => {
  const session = await getServerSession(authOptions);

  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
      discountPercentage: {
        not: 0,
      },
    },
    include: {
      category: {
        select: {
          slug: true,
        },
      },
    },
    take: 10,
  });

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
      })
    : [];

  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          userFavorites={userFavorites}
        />
      ))}
    </div>
  );
};

export default ProductList;
