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
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

interface CreateNewCategoryProps {
  openAddCategory: boolean;
  setOpenAddCategory: (open: boolean) => void;
}

const CreateNewCategory = ({
  openAddCategory,
  setOpenAddCategory,
}: CreateNewCategoryProps) => {
  const {
    handleSubmitCreateCategory,
    handleCreateCategory,
    registerCreateCategory,
    controlCreateCategory,
    errorsCreateCategory,
    isLoading,
  } = useCategories();

  return (
    <Dialog open={openAddCategory} onOpenChange={setOpenAddCategory}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Adicionar Categoria
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmitCreateCategory(handleCreateCategory)}
          className="space-y-10 px-5 py-3"
        >
          <Input
            label="Nome da categoria"
            placeholder="ex: Blusas e Calçados"
            {...registerCreateCategory("category_name", { required: true })}
            errors={errorsCreateCategory.category_name?.message}
            disabled={isLoading}
          />

          <Input
            label="Slug da categoria"
            placeholder="ex: blusas-e-calcados"
            {...registerCreateCategory("category_slug", { required: true })}
            errors={errorsCreateCategory?.category_slug?.message}
            disabled={isLoading}
          />

          <Input
            label="URL da imagem da categoria"
            type="url"
            placeholder="ex: https://example.com/image.jpg"
            {...registerCreateCategory("category_imgUrl", { required: true })}
            errors={errorsCreateCategory?.category_imgUrl?.message}
            disabled={isLoading}
          />

          <Controller
            name="category_visibility"
            control={controlCreateCategory}
            rules={{ required: true }}
            disabled={isLoading}
            defaultValue="isNotVisible"
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => field.onChange(value)}
                className="space-y-2"
              >
                <label
                  data-error={
                    errorsCreateCategory?.category_visibility?.message
                  }
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  Deixar categoria visível após criação?
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

                {errorsCreateCategory?.category_visibility?.message && (
                  <p className="text-destructive">
                    {errorsCreateCategory?.category_visibility?.message}
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
            Criar Categoria
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewCategory;
