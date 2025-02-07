import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string()
    .min(2, {message: "Nome deve ter pelo menos 2 caracteres.",})
    .max(50, {message: "Nome deve ter no máximo 2 caracteres.",}),
  email: z.string().email("Endereço de email inválido."),
  phone: z.string().refine((phone) => /^\+[1-9]\d{1,14}$/.test(phone),
  "Número de telefone inválido."),
})