"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const deleteAddress = async (id: string) => {
  await db.address.delete({
    where: {
      id,
    },
  });

  revalidatePath("/my-addresses");
};
