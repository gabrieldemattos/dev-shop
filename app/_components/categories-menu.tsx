"use client";

import { Category } from "@prisma/client";
import { CATEGORY_ICON } from "../_constants/category-icon";
import MenuButton from "./menu-button";
import { Loader2 } from "lucide-react";

interface CategoriesMenuProps {
  categories: Category[];
}

const CategoriesMenu = ({ categories }: CategoriesMenuProps) => {
  return (
    <>
      {categories.map((category: Category) => (
        <MenuButton
          key={category.id}
          className="font-normal"
          href={`/category/${category.slug}`}
          icon={CATEGORY_ICON[category.name as keyof typeof CATEGORY_ICON]}
          label={category.name}
        />
      ))}

      {!categories && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Carregando categorias...</span>
        </div>
      )}
    </>
  );
};

export default CategoriesMenu;
