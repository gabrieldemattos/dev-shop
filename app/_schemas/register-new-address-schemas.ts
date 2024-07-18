import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(4, {
    message: "Nome precisa ter pelo menos 4 caracteres.",
  }),
  firstName: z.string().min(1, {
    message: "Nome obrigatório.",
  }),
  lastName: z.string().min(1, {
    message: "Sobrenome obrigatório.",
  }),
  postalCode: z.string().min(1, {
    message: "CEP inválido.",
  }),
  street: z.string().min(2, {
    message: "Endereço inválido.",
  }),
  number: z.string().min(1, {
    message: "Número obrigatório.",
  }),
  neighborhood: z.string().min(2, {
    message: "Bairro inválido.",
  }),
  complement: z.string().optional(),
  city: z.string().min(2, {
    message: "Cidade obrigatória.",
  }),
  state: z.string().min(2, {
    message: "Estado obrigatório.",
  }),
  reference: z.string().optional(),
  ddd: z.string().min(2, {
    message: "DDD obrigatório.",
  }),
  telephone: z.string().min(9, {
    message: "Telefone de contato inválido.",
  }),
});
