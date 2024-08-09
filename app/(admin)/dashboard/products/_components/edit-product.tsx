"use client";

import { useProducts } from "@/app/(admin)/_hooks/useProducts";
import { IProduct } from "@/app/(admin)/_interface/Products";
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

interface EditProductProps {
  product: IProduct;
  categories: Category[];
  openEditProduct: boolean;
  setOpenEditProduct: (open: boolean) => void;
  revalidateProducts: () => void;
}

const EditProduct = ({
  product,
  categories,
  openEditProduct,
  setOpenEditProduct,
  revalidateProducts,
}: EditProductProps) => {
  const {
    handleEditProduct,
    registerEditProduct,
    handleSubmitEditProduct,
    controlEditProduct,
    errorsEditProduct,
    isLoading,
    fields,
    append,
    remove,
  } = useProducts(product);

  const addNewImage = () => {
    append({ url: "" });
  };

  const handleEditProductClick = async () => {
    await handleSubmitEditProduct(handleEditProduct)();

    revalidateProducts();
  };

  return (
    <Dialog open={openEditProduct} onOpenChange={setOpenEditProduct}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Editar Produto
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleEditProductClick}
          className="space-y-10 px-5 py-3"
        >
          <Input
            label="Nome do produto"
            placeholder="ex: Smartphone Samsung Galaxy A54"
            {...registerEditProduct("product_name", { required: true })}
            errors={errorsEditProduct.product_name?.message}
            disabled={isLoading}
          />

          <Input
            label="Slug do produto"
            placeholder="ex: smartphone-samsung-galaxy-a54"
            {...registerEditProduct("product_slug", { required: true })}
            errors={errorsEditProduct?.product_slug?.message}
            disabled={isLoading}
          />

          <Input
            label="Preço sem desconto"
            placeholder="ex: 2000"
            {...registerEditProduct("product_basePrice", { required: true })}
            errors={errorsEditProduct?.product_basePrice?.message}
            disabled={isLoading}
          />

          {fields.map((field, index) => (
            <div
              key={field.id}
              data-error={
                errorsEditProduct?.product_imageUrls?.[index]?.message
                  ? true
                  : false
              }
              className="flex items-end gap-3 data-[error=true]:items-center"
            >
              <Input
                label={`URL da imagem ${index + 1}`}
                placeholder="ex: https://utfs.io/...."
                {...registerEditProduct(`product_imageUrls.${index}.url`, {
                  required: true,
                })}
                disabled={isLoading}
                errors={errorsEditProduct?.product_imageUrls?.[index]?.message}
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
              Alterar Imagens
            </Button>

            {errorsEditProduct.product_imageUrls && (
              <p className="text-sm text-destructive">
                {errorsEditProduct.product_imageUrls.message}
              </p>
            )}

            {errorsEditProduct?.product_imageUrls?.root && (
              <p className="text-sm text-red-500">
                {errorsEditProduct?.product_imageUrls?.root?.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              data-error={errorsEditProduct.product_category}
              className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
            >
              Selecione a categoria do produto:
            </label>
            <Controller
              control={controlEditProduct}
              rules={{ required: true }}
              defaultValue={product.categoryId}
              name="product_category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    data-error={errorsEditProduct.product_category}
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
            {errorsEditProduct.product_category && (
              <p className="text-sm text-red-500">
                {errorsEditProduct.product_category.message}
              </p>
            )}
          </div>

          <Input
            label="Desconto em porcentagem"
            placeholder="ex: 10 (10%)"
            {...registerEditProduct("product_discountPercentage", {
              required: true,
            })}
            errors={errorsEditProduct?.product_discountPercentage?.message}
            disabled={isLoading}
          />

          <Controller
            name="product_description"
            rules={{ required: true }}
            control={controlEditProduct}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label
                  data-error={errorsEditProduct.product_description}
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  Descrição do produto:
                </label>

                <Textarea
                  placeholder="Coloque as informações do produto..."
                  data-error={errorsEditProduct.product_description}
                  className="resize-none shadow-md focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[error]:border-destructive"
                  disabled={isLoading}
                  {...field}
                />

                {errorsEditProduct.product_description && (
                  <p className="text-sm text-red-500">
                    {errorsEditProduct.product_description.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="product_status"
            control={controlEditProduct}
            rules={{ required: true }}
            disabled={isLoading}
            defaultValue={product.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => field.onChange(value)}
                className="space-y-2"
              >
                <label
                  data-error={errorsEditProduct?.product_status?.message}
                  className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
                >
                  Visibilidade da categoria:
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

                {errorsEditProduct?.product_status?.message && (
                  <p className="text-destructive">
                    {errorsEditProduct?.product_status?.message}
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
            Editar Produto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
