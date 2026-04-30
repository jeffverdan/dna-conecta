export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true, url, body } as T;
}


