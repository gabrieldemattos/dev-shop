"use client";

import { useCategories } from "@/app/(admin)/_hooks/useCategories";
import { Button } from "@/app/_components/ui/button";
import { Category } from "@prisma/client";
import { Pencil, Plus, SearchCheck, SearchIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateNewCategory from "./create-new-category";
import EditCategory from "./edit-category";
import { CATEGORY_ICON } from "@/app/_constants/category-icon";

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  const { handleDeleteCategory, isLoading } = useCategories();

  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {} as Category,
  );

  const [query, setQuery] = useState<string>("");

  const handleOpenAddCategory = () => setOpenAddCategory(true);
  const handleOpenEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenEditCategory(true);
  };

  const handleDeleteCategoryClick = async (id: string) =>
    await handleDeleteCategory(id);

  const filteredCategories =
    query.toLocaleLowerCase().length > 0
      ? categories.filter((category) =>
          category.name.toLocaleLowerCase().includes(query),
        )
      : categories;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-10 lg:px-8">
        <form className="relative flex w-full items-center rounded-full border-none lg:w-[500px]">
          <input
            type="text"
            placeholder="Pesquise a categoria"
            className="w-full rounded-md border-none bg-background p-2 px-12 outline-none"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          <SearchCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-opacity-80" />

          <Button size="icon" type="submit" className="absolute -right-1">
            <SearchIcon size={20} />
          </Button>
        </form>

        <div className="flex items-center">
          <Button
            onClick={handleOpenAddCategory}
            className="w-full gap-2 uppercase"
          >
            <Plus size={16} />
            Adicionar Nova Categoria
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredCategories.map((category) => (
          <div
            className="flex flex-col items-center justify-between gap-4 rounded-xl bg-blue-300 bg-opacity-40 p-4 shadow-md hover:bg-blue-400 hover:bg-opacity-40"
            key={category.id}
          >
            <div className="relative aspect-square min-h-[100px] w-[100px] rounded-full border-2 border-black bg-background">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="100%"
                className="object-contain p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p>
                Nome: <span className="font-bold italic">{category.name}</span>
              </p>

              <p className="flex items-center gap-1">
                Ícone:
                <span className="font-bold italic">
                  {CATEGORY_ICON[category.name as keyof typeof CATEGORY_ICON] ??
                    "Sem ícone"}
                </span>
              </p>

              <p>
                Slug: <span className="font-bold italic">{category.slug}</span>
              </p>

              <p>
                URL da imagem:{" "}
                <span className="font-bold italic">{category.imageUrl}</span>
              </p>

              <p>
                Visível:{" "}
                <span className="font-bold italic">
                  {category.isVisible ? "Visível" : "Não Visível"}
                </span>
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              <Button
                variant="outline"
                className="w-full items-center gap-2 uppercase"
                onClick={() => handleOpenEditCategory(category)}
                disabled={isLoading}
              >
                <Pencil size={18} />
                Editar
              </Button>

              <Button
                variant="destructive"
                className="w-full items-center gap-2 uppercase"
                onClick={() => handleDeleteCategoryClick(category.id)}
                disabled={isLoading}
              >
                <Trash size={18} />
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EditCategory
        category={selectedCategory}
        openEditCategory={openEditCategory}
        setEditCategory={setOpenEditCategory}
      />

      <CreateNewCategory
        openAddCategory={openAddCategory}
        setOpenAddCategory={setOpenAddCategory}
      />
    </div>
  );
};

export default CategoriesList;
