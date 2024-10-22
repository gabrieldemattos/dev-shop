import { toast } from "sonner";
import {
  createNewCategory,
  deleteCategory,
  updateCategory,
} from "../_actions/category";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormEditCategoryData } from "../_types/edit-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditCategorySchema } from "../_schemas/edit-category-schema";
import { Category } from "@prisma/client";
import { FormCreateCategoryData } from "../_types/create-category";
import { createCategorySchema } from "../_schemas/create-category-schema";
import { formatSlug } from "../_helpers/format-slug";

export const useCategories = (category?: Category) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormEditCategoryData>({
    resolver: zodResolver(EditCategorySchema),
  });

  const {
    handleSubmit: handleSubmitCreateCategory,
    register: registerCreateCategory,
    control: controlCreateCategory,
    setValue: setValueCreateCategory,
    watch: watchCreateCategory,
    reset: resetCreateCategory,
    formState: { errors: errorsCreateCategory },
  } = useForm<FormCreateCategoryData>({
    resolver: zodResolver(createCategorySchema),
  });

  const editSlug = watch("category_slug");

  useEffect(() => {
    setValue("category_slug", formatSlug(editSlug));
  }, [editSlug, setValue]);

  const createSlug = watchCreateCategory("category_slug");

  useEffect(() => {
    setValueCreateCategory("category_slug", formatSlug(createSlug));
  }, [createSlug, setValueCreateCategory]);

  const handleCreateCategory = async (data: FormCreateCategoryData) => {
    setIsLoading(true);
    try {
      await createNewCategory({
        name: data.category_name,
        slug: data.category_slug,
        imageUrl: data.category_imgUrl,
        isVisible: data.category_visibility === "isVisible" ? true : false,
      });

      resetCreateCategory();

      return toast.success("Categoria cadastrada com sucesso.", {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      return toast.error("Erro ao cadastrar categoria.", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCategory(id);

      return toast.success("Categoria excluída com sucesso.", {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);

      return toast.error("Erro ao excluir categoria.", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!category) return;

    setValue("category_name", category.name);
    setValue("category_slug", category.slug);
    setValue("category_imgUrl", category.imageUrl);
    setValue(
      "category_visibility",
      category.isVisible ? "isVisible" : "isNotVisible",
    );
  }, [category, setValue]);

  const handleEditCategory = async (data: FormEditCategoryData) => {
    setIsLoading(true);

    if (!category) return;

    try {
      await updateCategory({
        id: category.id,
        name: data.category_name,
        slug: data.category_slug,
        imageUrl: data.category_imgUrl,
        isVisible: data.category_visibility === "isVisible" ? true : false,
      });

      return toast.success("Categoria editada com sucesso.", {
        position: "bottom-center",
      });
    } catch (error) {
      return toast.error("Ocorreu um erro ao editar a categoria.", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateCategory,
    handleDeleteCategory,
    handleEditCategory,
    isLoading,
    register,
    handleSubmit,
    control,
    errors,
    handleSubmitCreateCategory,
    registerCreateCategory,
    controlCreateCategory,
    errorsCreateCategory,
  };
};
