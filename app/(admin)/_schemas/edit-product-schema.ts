import { z } from "zod";

export const EditProductSchema = z.object({
  product_name: z.string().min(1, {
    message: "Nome obrigatório.",
  }),
  product_slug: z.string().min(1, {
    message: "Slug obrigatório.",
  }),
  product_imageUrls: z
    .array(z.object({ url: z.string().url() }))
    .length(4, { message: "São necessárias exatamente 4 imagens diferentes." })
    .refine(
      (product_imageUrls) => {
        const urls = product_imageUrls.map((image) => image.url);
        const uniqueUrls = new Set(urls);
        return uniqueUrls.size === urls.length;
      },
      { message: "As imagens devem ser diferentes." },
    ),
  product_basePrice: z.string().min(1, {
    message: "Preço obrigatório.",
  }),
  product_category: z.string({
    required_error: "Selecione uma categoria.",
  }),
  product_discountPercentage: z.string().min(1, {
    message: "Porcentagem de desconto obrigatória.",
  }),
  product_description: z.string().min(1, {
    message: "Descrição obrigatória.",
  }),
  product_status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Selecione uma opção.",
  }),
});
