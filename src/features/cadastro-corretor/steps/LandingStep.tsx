import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { ArrowRight, Check } from "lucide-react";
import logoDNA from "@/images/logoDNA.svg";
import logoConecta from "@/images/logoConecta.svg";

export function LandingStep() {
  const setStep = useCadastroStore((s) => s.setStep);

  const items = [
    "Documento com foto (RG ou CNH)",
    "Comprovante de residencia",
    "CPF",
    "Nome de quem indicou (se houver)",
    "Aceite do nosso Termo de Corretagem"
  ];

  return (
    <section className="landing-step">
      <div className="landing-step-content">
        <img className="landing-step-logo-dna" src={logoDNA} alt="Logo DNA" />
        <img className="landing-step-logo-conecta" src={logoConecta} alt="Logo Conecta" />

        <div className="landing-step-copy">
          <h1 className="landing-step-title">
            Boas-vindas ao cadastro<br />de corretor
          </h1>
          <p className="landing-step-subtitle">
            Vamos comecar um cadastro rapido.<br />
            Depois, analisamos seus dados e te avisamos sobre os proximos passos.
          </p>
        </div>

        <div className="landing-step-box">
          <p className="landing-step-box-title">Voce vai precisar de:</p>
          {items.map((item) => (
            <div key={item} className="landing-step-item">
              <span className="landing-step-item-icon">
                <Check size={16} color="#6B9539" strokeWidth={3} />
              </span>
              <span className="landing-step-item-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep(1)}
        className="landing-step-start"
      >
        <span>Iniciar cadastro</span>
        <ArrowRight size={24} color="#ffffff" strokeWidth={2.5} />
      </button>

      <p className="landing-step-time">
        Tempo estimado: 3-6 minutos
      </p>
    </section>
  );
}
