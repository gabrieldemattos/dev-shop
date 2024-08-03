import { z } from "zod";
import { EditCategorySchema } from "../_schemas/edit-category-schema";

export type FormEditCategoryData = z.infer<typeof EditCategorySchema>;
