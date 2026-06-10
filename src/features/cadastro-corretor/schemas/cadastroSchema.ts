import { z } from "zod";

export const creciSchema = z.object({ creci: z.string().min(2), uf: z.string().length(2) });
export const enderecoSchema = z.object({ cep: z.string().min(8), rua: z.string().min(2), numero: z.string().min(1), bairro: z.string().min(2), cidade: z.string().min(2), estado: z.string().length(2), complemento: z.string().optional() });

// METODO DE PAGAMENTO É PIX OU BANCO
const bancoSchema = {
  name: z.string(),
  id: z.string(),
}
export const pagamentoSchema = z.object({ metodo: z.string(), pix: z.string().optional(), pixTipo: z.string().optional(), banco: z.object(bancoSchema).optional().nullable(), agencia: z.string().optional(), conta: z.string().optional(), contaTipo: z.string().optional() });

// STEP 4 - DOCUMENTOS
export const docsSchema = z.object({ 
  doc_rg_cnh_base64: z.string().min(5), 
  doc_rg_cnh_name: z.string().min(2),
  doc_residencia_base64: z.string().min(11),
  doc_residencia_name: z.string().min(2),
  doc_diploma_base64: z.string().optional(),
  doc_diploma_name: z.string().optional(),
  fotoBase64: z.string().min(10),
  fotoName: z.string().min(2)
});

// STEP 5 - INDICAÇÃO
export const indicacaoSchema = z.object({
  nome: z.string().min(3),
  lojaId: z.string().min(1)
});


export const termosSchema = z.object({ aceito: z.literal(true) });


