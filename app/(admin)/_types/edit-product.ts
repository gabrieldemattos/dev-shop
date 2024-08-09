import { z } from "zod";
import { EditProductSchema } from "../_schemas/edit-product-schema";

export type FormEditProductData = z.infer<typeof EditProductSchema>;
