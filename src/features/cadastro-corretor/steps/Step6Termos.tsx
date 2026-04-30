import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/services/api";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { toast } from "sonner";

export function Step6Termos() {
  const [canAccept, setCanAccept] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const data = useCadastroStore((s) => s.data);
  const setStep = useCadastroStore((s) => s.setStep);

  const mutation = useMutation({
    mutationFn: () => apiPost<{ ok: boolean }>("/cadastro-final", data),
    onSuccess: () => {
      toast.success("Cadastro enviado com sucesso");
      setStep(7);
    },
    onError: () => toast.error("Erro ao enviar")
  });

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) setCanAccept(true);
  };

  return (
    <section className="cc-step-card">
      <h1 className="cc-step-title">Etapa 6: Termos</h1>
      <div ref={ref} onScroll={onScroll} className="cc-terms-box">
        {Array.from({ length: 30 }).map((_, i) => <p key={i}>Termo {i + 1}: texto legal de aceite.</p>)}
      </div>
      <label className="cc-terms-label">
        <input type="checkbox" disabled={!canAccept} checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
        Aceito os termos e condicoes
      </label>
      <button disabled={!accepted || mutation.isPending} onClick={() => mutation.mutate()} className="cc-primary-button">
        Finalizar cadastro
      </button>
    </section>
  );
}
