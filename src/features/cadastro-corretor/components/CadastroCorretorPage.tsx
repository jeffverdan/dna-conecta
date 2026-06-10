import { Step1Creci } from "@/features/cadastro-corretor/steps/Step1Creci";
import { Step2Endereco } from "@/features/cadastro-corretor/steps/Step2Endereco";
import { Step3Pix } from "@/features/cadastro-corretor/steps/Step3Pix";
import { Step4Foto } from "@/features/cadastro-corretor/steps/Step4Foto";
import { Step5Loja } from "@/features/cadastro-corretor/steps/Step5Loja";
import { Step6Termos } from "@/features/cadastro-corretor/steps/Step6Termos";
import { StepSuccess } from "@/features/cadastro-corretor/steps/StepSuccess";
import { LandingStep } from "@/features/cadastro-corretor/steps/LandingStep";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function CadastroCorretorPage() {
  const currentStep = useCadastroStore((s) => s.currentStep);
  const setStep = useCadastroStore((s) => s.setStep);
  const visualStep = Math.min(Math.max(currentStep, 1), 6);

  const view =
    currentStep === 0 ? <LandingStep /> :
      currentStep === 1 ? <Step1Creci /> :
        currentStep === 2 ? <Step2Endereco /> :
          currentStep === 3 ? <Step3Pix /> :
            currentStep === 4 ? <Step4Foto /> :
              currentStep === 5 ? <Step5Loja /> :
                currentStep === 6 ? <Step6Termos /> :
                  <StepSuccess />;

  return (
    <div className="cadastro-corretor-page">
      <div className="cadastro-corretor-shell">
        {currentStep > 0 && currentStep !== 7 && (
          <header className="cadastro-corretor-header">
            <div className="cc-step1-header-top">
              <button type="button" onClick={() => setStep(visualStep - 1)} className="cc-step1-back">
                <ArrowLeft size={24} color="#01988C" />
              </button>
              <div className="cc-step1-header-texts">
                <div className="cc-step1-header-title">Cadastro de Corretor</div>
              </div>
            </div>
            {currentStep < 7 && (
              <>
                <p className="cc-step1-header-subtitle">Etapa {visualStep} de 6</p>
                <div className="cadastro-corretor-progress">
                  <div className={`cadastro-corretor-progress-fill cadastro-corretor-progress-fill--${visualStep}`} />
                </div>
              </>
            )}
          </header>
        )}

        <main className={"cadastro-corretor-main"}>
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {view}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
