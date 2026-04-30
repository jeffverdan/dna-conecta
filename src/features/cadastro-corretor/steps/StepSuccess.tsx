import { motion } from "framer-motion";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";

export function StepSuccess() {
  const reset = useCadastroStore((s) => s.reset);

  return (
    <motion.section initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="cc-success-card">
      <div className="cc-success-icon">?</div>
      <h1 className="cc-success-title">Cadastro concluido</h1>
      <p className="cc-success-subtitle">Seus dados foram recebidos com sucesso.</p>
      <button onClick={reset} className="cc-success-button">Fazer novo cadastro</button>
    </motion.section>
  );
}
