import { motion } from "framer-motion";
import sucessImg from "@/images/sucess_image.svg";
import { CheckCircle2, Clock } from "lucide-react";
import { HiExclamationCircle } from "react-icons/hi";


export function StepSuccess() {
  return (
    <motion.section initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="cc-success-card">
      <img src={sucessImg} alt="Success" className="success-image" />
      <div className="cc-success-header">
        <h2 className="cc-sucess-title">Cadastro recebido!</h2>
        <p className="cc-sucess-subtitle">Seu cadastro foi enviado e já está em análise pelo nosso time.</p>
      </div>

      <div className="cc-nextsteps-container">
        <p className="cc-nextstep-label">O que acontece agora:</p>
        <div className="cc-nextstep-step">
          <CheckCircle2 className="green" />
          <span>Recebemos seus dados</span>
        </div>

        <div className="cc-nextstep-step">
          <Clock className="yellow" />
          <span>Estamos analisando suas informações</span>
        </div>

        <div className="cc-nextstep-step disabled">
          <CheckCircle2 className="green" />
          <span>Recebemos seus dados</span>
        </div>
      </div>

      <div className="cc-step-card-helper">
        <HiExclamationCircle />
        <span className="cc-step-card-helper-text">
          Vamos te avisar pelo WhatsApp assim que houver atualização.
        </span>
      </div>

      <p className="cc-endlabel">Se quiser você pode fechar esta janela.</p>

    </motion.section>
  );
}
