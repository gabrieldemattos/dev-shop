"use client";

import { useCategories } from "@/app/(admin)/_hooks/useCategories";
import Input from "@/app/_components/input";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { Controller } from "react-hook-form";

interface EditCategoryProps {
  category: Category;
  openEditCategory: boolean;
  setEditCategory: (open: boolean) => void;
  revalidateCategories: () => void;
}

const EditCategory = ({
  category,
  openEditCategory,
  setEditCategory,
  revalidateCategories,
}: EditCategoryProps) => {
  const {
    handleEditCategory,
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
  } = useCategories(category);

  const handleEditCategoryClick = async (e: FormEvent<HTMLFormElement>) => {
    await handleSubmit(handleEditCategory)();

    e.preventDefault();

    if (errors) return;

    revalidateCategories();
  };

  return (
    <Dialog open={openEditCategory} onOpenChange={setEditCategory}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Editar Categoria
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleEditCategoryClick}
          className="space-y-10 px-5 py-3"
        >
          <Input
            label="Nome da categoria"
            placeholder="ex: Blusas e Calçados"
            {...register("category_name", { required: true })}
            errors={errors.category_name?.message}
            disabled={isLoading}
          />

          <Input
            label="Slug da categoria"
            placeholder="ex: blusas-e-calcados"
            {...register("category_slug", { required: true })}
            errors={errors?.category_slug?.message}
            disabled={isLoading}
          />

          <Input
            label="URL da imagem da categoria"
            type="url"
            placeholder="ex: https://example.com/image.jpg"
            {...register("category_imgUrl", { required: true })}
            errors={errors?.category_imgUrl?.message}
            disabled={isLoading}
          />

          <Controller
            name="category_visibility"
            control={control}
            rules={{ required: true }}
            disabled={isLoading}
            defaultValue={category.isVisible ? "isVisible" : "isNotVisible"}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => field.onChange(value)}
                className="space-y-2"
              >
                <label
                  data-error={errors?.category_visibility?.message}
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  Visibilidade da categoria:
                </label>

                <div className="items-cente flex justify-between md:justify-start md:gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="isVisible" id="isVisible" />
                    <Label htmlFor="isVisible">Visível</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="isNotVisible" id="isNotVisible" />
                    <Label htmlFor="isNotVisible">Não Visível</Label>
                  </div>
                </div>

                {errors?.category_visibility?.message && (
                  <p className="text-destructive">
                    {errors?.category_visibility?.message}
                  </p>
                )}
              </RadioGroup>
            )}
          />

          <Button
            className="w-full gap-1 uppercase"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="ml-2 animate-spin" size={20} />}
            Editar Categoria
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
