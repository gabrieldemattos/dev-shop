"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import CategoriesCard from "./category-card";
import CreateNewCategory from "./create-new-category";

interface ProductsListProps {
  categories: Category[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const CategoriesList = ({ categories, query, setQuery }: ProductsListProps) => {
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);

  const handleOpenAddCategoryClick = () => setOpenAddCategory(true);

  return (
    <div className="container mx-auto px-0 py-8 md:px-4">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary md:w-1/2"
        />

        <button
          className="flex w-full items-center gap-2 rounded bg-primary px-4 py-2 text-xs uppercase text-white sm:text-base md:w-fit"
          onClick={handleOpenAddCategoryClick}
        >
          <Plus />
          Adicionar Nova Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            category={JSON.parse(JSON.stringify(category))}
          />
        ))}
      </div>

      <CreateNewCategory
        openAddCategory={openAddCategory}
        setOpenAddCategory={setOpenAddCategory}
      />
    </div>
  );
};

export default CategoriesList;
