import { db } from "@/app/_lib/prisma";
import ProductsList from "./_components/products-list";

const AdminProductPage = async () => {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      _count: {
        select: { reviews: true, orderProduct: true, usersWhoFavorited: true },
      },
    },
  });

  const categories = await db.category.findMany({});

  return (
    <div className="p-8">
      <div className="max-h-[850px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:w-[800px] xl:w-full">
        <ProductsList
          products={JSON.parse(JSON.stringify(products))}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default AdminProductPage;
