"use client";

import { Category } from "@prisma/client";
import CategoriesCard from "./category-card";

interface ProductsListProps {
  categories: Category[];
  revalidateCategories: () => void;
}

const CategoriesList = ({
  categories,
  revalidateCategories,
}: ProductsListProps) => {
  return (
    <div className="container mx-auto px-0 py-3 pb-8 md:px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            category={JSON.parse(JSON.stringify(category))}
            revalidateCategories={revalidateCategories}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
