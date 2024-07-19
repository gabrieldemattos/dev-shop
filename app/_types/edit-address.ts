import { z } from "zod";
import { editAddressSchema } from "../_schemas/edit-address-schema";

export type EditAddressFormData = z.infer<typeof editAddressSchema>;
