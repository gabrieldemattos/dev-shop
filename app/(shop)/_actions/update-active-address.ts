"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../_lib/prisma";

export const updatePrimaryAddress = async (
  userId: string | undefined,
  addressId: string,
) => {
  if (!userId) return;

  const address = await db.address.findFirst({
    where: {
      id: addressId,
    },
  });

  if (!address) {
    throw new Error("Endereço não encontrado.");
  }

  await db.address.updateMany({
    where: {
      userId: userId,
      NOT: {
        id: addressId,
      },
    },
    data: {
      active: false,
    },
  });

  const updatedAddress = await db.address.update({
    where: {
      id: addressId,
    },
    data: {
      active: true,
    },
  });

  revalidatePath("/my-addresses");

  return updatedAddress;
};
