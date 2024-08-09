"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import CategoriesCard from "./category-card";
import CreateNewCategory from "./create-new-category";

interface ProductsListProps {
  categories: Category[];
  totalCategories: number;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  revalidateCategories: () => void;
}

const CategoriesList = ({
  categories,
  totalCategories,
  query,
  setQuery,
  revalidateCategories,
}: ProductsListProps) => {
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);

  const handleOpenAddCategoryClick = () => setOpenAddCategory(true);

  return (
    <div className="container mx-auto px-0 py-3 pb-8 md:px-4">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Buscar categoria..."
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

      <h1 className="py-3 pl-3 text-sm font-bold sm:text-xl">
        {totalCategories}{" "}
        {totalCategories === 1
          ? "Categoria encontrada"
          : "Categorias encontradas"}{" "}
        no total
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            category={JSON.parse(JSON.stringify(category))}
            revalidateCategories={revalidateCategories}
          />
        ))}
      </div>

      <CreateNewCategory
        openAddCategory={openAddCategory}
        setOpenAddCategory={setOpenAddCategory}
        revalidateCategories={revalidateCategories}
      />
    </div>
  );
};

export default CategoriesList;
