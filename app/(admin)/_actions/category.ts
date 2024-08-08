"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createNewCategory = async (data: Prisma.CategoryCreateInput) => {
  await db.category.create({ data });

  revalidatePath("/dashboard/categories");
};

export const getCategory = async (id: string) => {
  return await db.category.findUnique({
    where: {
      id,
    },
  });
};

export const fetchAllCategories = async () => {
  return await db.category.findMany({ orderBy: { createdAt: "desc" } });
};

export const deleteCategory = async (id: string) => {
  await db.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/categories");
};

export const updateCategory = async (data: Prisma.CategoryUpdateInput) => {
  await db.category.update({
    where: {
      id: data.id as string,
    },
    data,
  });

  revalidatePath("/dashboard/categories");
};
