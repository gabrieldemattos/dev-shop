"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { Prisma } from "@prisma/client";

export const registerAddress = async (
  userId: string,
  data: Prisma.AddressCreateInput,
) => {
  await db.$transaction(async (db) => {
    await db.address.updateMany({
      where: {
        userId,
      },
      data: {
        active: false,
      },
    });

    await db.address.create({
      data: {
        ...data,
        active: true,
      },
    });
  });

  revalidatePath("/my-addresses");
};
