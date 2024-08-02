import { z } from "zod";
import { addressSchema } from "../_schemas/register-new-address-schemas";

export type AddressFormData = z.infer<typeof addressSchema>;
