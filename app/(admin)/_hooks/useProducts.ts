"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { createProductSchema } from "../_schemas/create-product-schema";
import { FormCreateProductData } from "../_types/create-product";
import { createNewProduct, deleteProduct } from "../_actions/product";

export const useProducts = (Product?: Product) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormCreateProductData>({
    resolver: zodResolver(createProductSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_imageUrls",
  });

  const handleCreateProduct = async (data: FormCreateProductData) => {
    setIsLoading(true);
    try {
      await createNewProduct({
        name: data.product_name,
        slug: data.product_slug,
        description: data.product_description,
        basePrice: data.product_basePrice,
        imageUrls: data.product_imageUrls.map((image) => image.url),
        category: {
          connect: { id: data.product_category },
        },
        discountPercentage: Number(data.product_discountPercentage),
        status: data.product_status,
      });

      reset();

      return toast.success("Produto cadastrado com sucesso.", {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      return toast.error("Erro ao cadastrar o produto.", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);

      return toast.success("Produto excluído com sucesso.", {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);

      return toast.error("Erro ao excluir produto.", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateProduct,
    handleDeleteProduct,
    control,
    fields,
    append,
    remove,
    handleSubmit,
    isLoading,
    errors,
    register,
  };
};
