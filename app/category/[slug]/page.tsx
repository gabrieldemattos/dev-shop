import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { Badge } from "@/app/_components/ui/badge";
import { CATEGORY_ICON } from "@/app/_constants/category-icon";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
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
      <div className="mb-8">
        <Header />
      </div>

      <div className="mx-auto flex flex-col justify-center gap-5 px-5">
        <Badge variant="outline" className="space-x-2 border-none p-2 text-lg">
          {CATEGORY_ICON[category.name as keyof typeof CATEGORY_ICON]}
          <span className="font-semibold uppercase">{category.name}</span>
        </Badge>

        <div className="mx-auto grid grid-cols-2 gap-8">
          {orderedProducts.map((product) => (
            <ProductItem key={product.id} product={{ ...product, category }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
