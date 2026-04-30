import { z } from "zod";

export const creciSchema = z.object({ creci: z.string().min(2), uf: z.string().length(2) });
export const enderecoSchema = z.object({ cep: z.string().min(8), rua: z.string().min(2), numero: z.string().min(1), bairro: z.string().min(2), cidade: z.string().min(2), estado: z.string().length(2), complemento: z.string().optional() });
// METODO DE PAGAMENTO É PIX OU BANCO
const bancoSchema = {
  name: z.string(),
  id: z.string(),
}
export const pagamentoSchema = z.object({ metodo: z.string(), pix: z.string().optional(), pixTipo: z.string().optional(), banco: z.object(bancoSchema).optional().nullable(), agencia: z.string().optional(), conta: z.string().optional(), contaTipo: z.string().optional() });
export const fotoSchema = z.object({ fotoBase64: z.string().min(10) });
export const lojaSchema = z.object({ lojaId: z.string().min(1) });
export const termosSchema = z.object({ aceito: z.literal(true) });


