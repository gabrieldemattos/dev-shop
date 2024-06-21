import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
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

  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
