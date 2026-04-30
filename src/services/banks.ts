export type Bank = {
  ispb: string;
  name: string;
  code: string;
  fullName: string;
};

export async function fetchBanks(): Promise<Bank[]> {
  const res = await fetch("https://brasilapi.com.br/api/banks/v1");
  if (!res.ok) throw new Error("Falha ao buscar lista de bancos");
  return res.json();
}
