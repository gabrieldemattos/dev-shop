import { z } from "zod";
import { createCategorySchema } from "../_schemas/create-category-schema";

export type FormCreateCategoryData = z.infer<typeof createCategorySchema>;
