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
import { filterOnlyNumbers } from "@/app/(shop)/_helpers/filter-only-numbers";
import { formatSlug } from "../_helpers/format-slug";

export const useProducts = (product?: Product | IProduct) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register: registerEditProduct,
    handleSubmit: handleSubmitEditProduct,
    setValue: setValueEditProduct,
    control: controlEditProduct,
    watch: watchEditProduct,
    formState: { errors: errorsEditProduct },
  } = useForm<FormEditProductData>({
    resolver: zodResolver(EditProductSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormCreateProductData>({
    resolver: zodResolver(createProductSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_imageUrls",
  });

  // CREATE
  const discount = watch("product_discountPercentage");

  useEffect(() => {
    setValue("product_discountPercentage", filterOnlyNumbers(discount));
  }, [discount, setValue]);

  const price = watch("product_basePrice");

  useEffect(() => {
    setValue("product_basePrice", filterOnlyNumbers(price));
  }, [price, setValue]);

  const slug = watch("product_slug");

  useEffect(() => {
    setValue("product_slug", formatSlug(slug));
  }, [slug, setValue]);

  // EDIT
  const editDiscount = watchEditProduct("product_discountPercentage");

  useEffect(() => {
    setValueEditProduct(
      "product_discountPercentage",
      filterOnlyNumbers(editDiscount),
    );
  }, [editDiscount, setValueEditProduct]);

  const editPrice = watchEditProduct("product_basePrice");

  useEffect(() => {
    setValueEditProduct("product_basePrice", filterOnlyNumbers(editPrice));
  }, [editPrice, setValueEditProduct]);

  const editSlug = watchEditProduct("product_slug");

  useEffect(() => {
    setValueEditProduct("product_slug", formatSlug(editSlug));
  }, [editSlug, setValueEditProduct]);

  const handleCreateProduct = async (data: FormCreateProductData) => {
    if (Number(data.product_discountPercentage) > 100)
      return toast.error("Desconto não pode ser maior que 100.", {
        position: "bottom-center",
        duration: 2000,
      });

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

    setValueEditProduct("product_name", product.name);
    setValueEditProduct("product_slug", formatSlug(product.slug));
    setValueEditProduct("product_description", product.description);
    setValueEditProduct(
      "product_imageUrls",
      product.imageUrls?.map((image) => ({ url: image })),
    );
    setValueEditProduct("product_basePrice", product.basePrice?.toString());
    setValueEditProduct("product_category", product.categoryId);
    setValueEditProduct(
      "product_discountPercentage",
      product.discountPercentage?.toString(),
    );
    setValueEditProduct("product_status", product.status);
  }, [product, setValueEditProduct]);

  const handleEditProduct = async (data: FormEditProductData) => {
    if (Number(data.product_discountPercentage) > 100)
      return toast.error("Desconto não pode ser maior que 100.", {
        position: "bottom-center",
        duration: 2000,
      });

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
