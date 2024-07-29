import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { Badge } from "@/app/_components/ui/badge";
import { CATEGORY_ICON } from "@/app/_constants/category-icon";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const session = await getServerSession(authOptions);

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
      })
    : [];

  const category = await db.category.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) return notFound();

  const orderedProducts = category.products.sort((a, b) => {
    return b.discountPercentage - a.discountPercentage;
  });

  return (
    <>
      <div className="mb-8 lg:mb-0">
        <Header />
      </div>

      <div className="mx-auto flex flex-col justify-center gap-5 px-5 pb-5 xl:px-20 2xl:px-64">
        <div className="flex w-fit items-center gap-2 rounded-full bg-background px-3 py-[5px] uppercase shadow-md lg:col-span-4">
          <Badge variant="outline" className="space-x-2 border-none text-lg">
            {CATEGORY_ICON[category.name as keyof typeof CATEGORY_ICON]}
            <span className="text-base font-bold uppercase sm:text-xl">
              {category.name}
            </span>
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {orderedProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={{ ...product, category }}
              className="g min-w-full"
              userFavorites={userFavorites}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
