"use client";

import { useProducts } from "@/app/(admin)/_hooks/useProducts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

interface CreateNewProductProps {
  openAddProduct: boolean;
  setOpenAddProduct: (open: boolean) => void;
  categories: Category[];
}

const CreateNewProduct = ({
  openAddProduct,
  setOpenAddProduct,
  categories,
}: CreateNewProductProps) => {
  const {
    handleCreateProduct,
    control,
    fields,
    append,
    remove,
    handleSubmit,
    isLoading,
    errors,
    register,
  } = useProducts();

  const addNewImage = () => {
    append({ url: "" });
  };

  return (
    <Dialog open={openAddProduct} onOpenChange={setOpenAddProduct}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Adicionar Produto
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-10 px-5 py-3"
        >
          <Input
            label="Nome do produto"
            placeholder="ex: Smartphone Samsung Galaxy A54"
            {...register("product_name", { required: true })}
            errors={errors.product_name?.message}
            disabled={isLoading}
          />

          <Input
            label="Slug do produto"
            placeholder="ex: smartphone-samsung-galaxy-a54"
            {...register("product_slug", { required: true })}
            errors={errors?.product_slug?.message}
            disabled={isLoading}
          />

          <Input
            label="Preço sem desconto"
            placeholder="ex: 2000"
            {...register("product_basePrice", { required: true })}
            errors={errors?.product_basePrice?.message}
            disabled={isLoading}
          />

          {fields.map((field, index) => (
            <div
              key={field.id}
              data-error={
                errors?.product_imageUrls?.[index]?.message ? true : false
              }
              className="flex items-end gap-3 data-[error=true]:items-center"
            >
              <Input
                label={`URL da imagem ${index + 1}`}
                placeholder="ex: https://utfs.io/...."
                {...register(`product_imageUrls.${index}.url`, {
                  required: true,
                })}
                disabled={isLoading}
                errors={errors?.product_imageUrls?.[index]?.message}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                disabled={isLoading}
              >
                Remover
              </Button>
            </div>
          ))}

          <div className="space-y-1">
            <Button
              type="button"
              className="w-full"
              onClick={addNewImage}
              disabled={isLoading || fields.length >= 4}
            >
              Adicionar Nova Imagem
            </Button>

            {errors.product_imageUrls && (
              <p className="text-sm text-destructive">
                {errors.product_imageUrls.message}
              </p>
            )}

            {errors?.product_imageUrls?.root && (
              <p className="text-sm text-red-500">
                {errors?.product_imageUrls?.root?.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              data-error={errors.product_category}
              className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
            >
              Selecione a categoria do produto:
            </label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="product_category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    data-error={errors.product_category}
                    className="w-full shadow-md focus:ring-0 data-[error]:border-destructive"
                  >
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.product_category && (
              <p className="text-sm text-red-500">
                {errors.product_category.message}
              </p>
            )}
          </div>

          <Input
            label="Desconto em porcentagem"
            placeholder="ex: 10 (10%)"
            {...register("product_discountPercentage", { required: true })}
            errors={errors?.product_discountPercentage?.message}
            disabled={isLoading}
          />

          <Controller
            name="product_description"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label
                  data-error={errors.product_description}
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  Descrição do produto:
                </label>

                <Textarea
                  placeholder="Coloque as informações do produto..."
                  data-error={errors.product_description}
                  className="resize-none shadow-md focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[error]:border-destructive"
                  disabled={isLoading}
                  {...field}
                />

                {errors.product_description && (
                  <p className="text-sm text-red-500">
                    {errors.product_description.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="product_status"
            control={control}
            rules={{ required: true }}
            disabled={isLoading}
            defaultValue="INACTIVE"
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => field.onChange(value)}
                className="space-y-2"
              >
                <label
                  data-error={errors?.product_status?.message}
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  O produto está em estoque?
                </label>

                <div className="items-cente flex justify-between md:justify-start md:gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ACTIVE" id="ACTIVE" />
                    <Label htmlFor="ACTIVE">Em Estoque</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="INACTIVE" id="INACTIVE" />
                    <Label htmlFor="INACTIVE">Fora de Estoque</Label>
                  </div>
                </div>

                {errors?.product_status?.message && (
                  <p className="text-sm text-destructive">
                    {errors?.product_status?.message}
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
            Criar Novo Produto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewProduct;
