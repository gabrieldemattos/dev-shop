import { z } from "zod";

export const editAddressSchema = z.object({
  label: z.string().min(4, {
    message: "O nome precisa ter pelo menos 4 caracteres.",
  }),
  number: z.string().min(1, {
    message: "Preencha o número da residência.",
  }),
  complement: z.string().optional(),
  reference: z.string().optional(),
});
