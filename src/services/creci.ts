export type CreciResponse = { nome: string; situacao: "ATIVO" | "INATIVO" | "NAO_ENCONTRADO"; dataConsulta: string };
export async function consultarCreci(numero: string, uf: string): Promise<CreciResponse> {
  await new Promise((r) => setTimeout(r, 700));
  if ((numero + uf).endsWith("0")) return { nome: "", situacao: "NAO_ENCONTRADO", dataConsulta: new Date().toISOString() };
  return { nome: "Corretor Exemplo", situacao: numero.endsWith("1") ? "INATIVO" : "ATIVO", dataConsulta: new Date().toISOString() };
}


