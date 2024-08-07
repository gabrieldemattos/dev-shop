import { z } from "zod";
import { createProductSchema } from "../_schemas/create-product-schema";

export type FormCreateProductData = z.infer<typeof createProductSchema>;
