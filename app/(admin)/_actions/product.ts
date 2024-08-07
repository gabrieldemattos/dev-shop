"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createNewProduct = async (data: Prisma.ProductCreateInput) => {
  await db.product.create({ data });

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (id: string) => {
  await db.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/products");
};
