"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../_lib/prisma";
import { IEditAddressData } from "../_interfaces/EditAddressData";

export const editAddress = async (data: IEditAddressData) => {
  await db.address.update({
    where: {
      id: data.id,
    },
    data: {
      label: data.label,
      number: data.number,
      complement: data.complement,
      reference: data.reference,
    },
  });

  revalidatePath("/my-addresses");
};
