export type ViaCepResult = {logradouro: string; bairro: string; localidade: string; uf: string; erro?: boolean};
export async function fetchViaCep(cep: string): Promise<ViaCepResult> {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!res.ok) throw new Error("Falha CEP");
  return res.json();
}


