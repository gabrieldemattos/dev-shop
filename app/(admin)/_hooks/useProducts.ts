"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { createProductSchema } from "../_schemas/create-product-schema";
import { FormCreateProductData } from "../_types/create-product";
import {
  createNewProduct,
  deleteProduct,
  updateProduct,
} from "../_actions/product";
import { FormEditProductData } from "../_types/edit-product";
import { EditProductSchema } from "../_schemas/edit-product-schema";
import { IProduct } from "../_interface/Products";

export const useProducts = (product?: Product | IProduct) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register: registerEditProduct,
    handleSubmit: handleSubmitEditProduct,
    setValue,
    control: controlEditProduct,
    formState: { errors: errorsEditProduct },
  } = useForm<FormEditProductData>({
    resolver: zodResolver(EditProductSchema),
  });

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

  useEffect(() => {
    if (!product) return;

    setValue("product_name", product.name);
    setValue("product_slug", product.slug);
    setValue("product_description", product.description);
    setValue(
      "product_imageUrls",
      product.imageUrls?.map((image) => ({ url: image })),
    );
    setValue("product_basePrice", product.basePrice?.toString());
    setValue("product_category", product.categoryId);
    setValue(
      "product_discountPercentage",
      product.discountPercentage?.toString(),
    );
    setValue("product_status", product.status);
  }, [product, setValue]);

  const handleEditProduct = async (data: FormEditProductData) => {
    setIsLoading(true);

    if (!product) return;

    try {
      await updateProduct({
        id: product.id,
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

      return toast.success("Produto editado com sucesso.", {
        position: "bottom-center",
      });
    } catch (error) {
      return toast.error("Ocorreu um erro ao editar o produto.", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateProduct,
    handleDeleteProduct,
    handleEditProduct,
    control,
    fields,
    append,
    remove,
    handleSubmit,
    isLoading,
    errors,
    register,
    registerEditProduct,
    handleSubmitEditProduct,
    controlEditProduct,
    errorsEditProduct,
  };
};
