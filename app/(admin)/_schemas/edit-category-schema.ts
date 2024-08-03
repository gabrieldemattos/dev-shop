import { z } from "zod";

export const EditCategorySchema = z.object({
  category_name: z.string().min(1, {
    message: "Nome obrigatório.",
  }),
  category_slug: z.string().min(1, {
    message: "Slug obrigatório.",
  }),
  category_imgUrl: z.string().min(1, {
    message: "Imagem obrigatória.",
  }),
  category_visibility: z.enum(["isVisible", "isNotVisible"], {
    message: "Selecione uma opção.",
  }),
});
