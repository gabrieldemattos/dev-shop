"use client";

import { Category } from "@prisma/client";
import { Edit, Eye, Info, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import EditCategory from "./edit-category";
import { useCategories } from "@/app/(admin)/_hooks/useCategories";
import { useState } from "react";

interface ProductCardProps {
  category: Category;
  revalidateCategories: () => void;
}

const CategoryCard = ({ category, revalidateCategories }: ProductCardProps) => {
  const { handleDeleteCategory, isLoading } = useCategories();
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {} as Category,
  );

  const handleOpenEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenEditCategory(true);
  };

  const handleDeleteCategoryClick = async (id: string) => {
    await handleDeleteCategory(id);

    revalidateCategories();
  };

  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg transition duration-200 hover:border-primary hover:shadow-xl">
      <div className="relative mb-4 aspect-square h-48 w-full rounded">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>

      <h2 className="text-base font-bold lg:text-xl">{category.name}</h2>

      <div className="py-4">
        <Separator />
      </div>

      <div className="h-auto flex-1">
        <p className="mb-2 flex items-center gap-1 text-gray-700">
          <span className="flex items-center font-semibold">
            <Info className="mr-1 inline" />{" "}
            <span className="hidden lg:block">Slug:</span>{" "}
          </span>
          {category.slug}
        </p>

        <p className="mb-2 flex items-center gap-1 text-gray-700">
          <span className="flex items-center font-semibold">
            <Eye className="mr-1 inline" />{" "}
            <span className="hidden lg:block">Visível:</span>{" "}
          </span>
          {category.isVisible ? "Visível" : "Não Visível"}
        </p>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4">
        <Button
          variant="outline"
          className="flex w-full items-center rounded bg-green-500 px-4 py-2 text-white transition duration-200 hover:bg-green-600 hover:text-white"
          onClick={() => handleOpenEditCategory(category)}
          disabled={isLoading}
        >
          <Edit className="mr-2" /> Editar
        </Button>

        <Button
          className="flex w-full items-center rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600 hover:text-white"
          onClick={() => handleDeleteCategoryClick(category.id)}
          disabled={isLoading}
        >
          <Trash className="mr-2" /> Remover
        </Button>
      </div>

      <EditCategory
        category={selectedCategory}
        openEditCategory={openEditCategory}
        setEditCategory={setOpenEditCategory}
        revalidateCategories={revalidateCategories}
      />
    </div>
  );
};

export default CategoryCard;
