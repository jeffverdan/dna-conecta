import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/services/api";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { toast } from "sonner";
import docInfo from "@/images/DocInfo.svg";
import { TERMO_TEXT } from "../utils/constants";
import { HiExclamationCircle } from "react-icons/hi";
import { CheckIcon } from "lucide-react";

export function Step6Termos() {  
  const [accepted, setAccepted] = useState(false);  
  const data = useCadastroStore((s) => s.data);
  const setStep = useCadastroStore((s) => s.setStep);

  console.log("Accepted: ", accepted)

  const mutation = useMutation({
    mutationFn: () => apiPost<{ ok: boolean }>("/cadastro-final", data),
    onSuccess: () => {
      toast.success("Cadastro enviado com sucesso");
      setStep(7);
    },
    onError: () => toast.error("Erro ao enviar")
  });

  return (
    <section className="cc-step6-card">
      <div className="cc-step-section-title-row">
        <img className="step-title-icon" src={docInfo} alt="Icon" />
        <h2 className="cc-step-section-title">Termos e contrato</h2>
      </div>

      <p className="cc-step4-subtitle">Leia e aceite os termos para concluir seu cadastro..</p>

      <div className="cc-terms-box">
        <pre>{TERMO_TEXT}</pre>
      </div>

      <div className="cc-step-card-helper">
        <HiExclamationCircle />
        <span className="cc-step-card-helper-text">
          Você pode consultar este documento sempre que precisar.
        </span>
      </div>

      <label className="cc-terms-label checkbox-container">
        <input type="checkbox" className="check" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
        <p className="label-checkbox">Li e aceito o Contrato de Corretagem*</p>
      </label>

      <button disabled={!accepted || mutation.isPending} onClick={() => mutation.mutate()} className="cc-primary-button">
        Enviar cadastro 
        <CheckIcon />
      </button>
    </section>
  );
}
