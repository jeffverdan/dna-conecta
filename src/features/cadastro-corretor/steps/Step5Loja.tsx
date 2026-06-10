import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { indicacaoSchema } from "../schemas/cadastroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { HiExclamationCircle, HiUserGroup } from "react-icons/hi";
import InputText from "@/components/form/InputText";
import InputSelect from "@/components/form/InputSelect";
import { lojasDNA } from "../utils/constants";
import logoConecta from "@/images/logoConecta.svg";
import { ArrowRight } from "lucide-react";


type FormData = z.infer<typeof indicacaoSchema>;

export function Step5Loja() {
  const patchData = useCadastroStore((s) => s.patchData);
  const setStep = useCadastroStore((s) => s.setStep);
  const data = useCadastroStore((s) => s.data);

  const {
    register,
    handleSubmit,
    watch,    
    formState: { isValid, errors },    
  } = useForm<FormData>({
    resolver: zodResolver(indicacaoSchema),
    mode: "onChange",
    defaultValues: data as FormData
  });

  console.log("Watch: ", watch());

  const onSubmit = (v: FormData) => {
    patchData({ ...v });
    setStep(6);
  };

  const onClickNotValid = () => {
    if (isValid) return;

    const firstError = Object.keys(errors)[0] as keyof FormData | undefined;
    console.log("Erro: ", errors);

    if (!firstError) return;

    const addressAutoFields = ["rg_cnh", "residencia", "fotoBase64"];
    const targetField = addressAutoFields.includes(firstError) ? "rg_cnh" : firstError;
    const element = document.querySelector(`[name="${targetField}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      (element as HTMLElement).focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cc-step-form">
      <div className="cc-step-layout">
        <div className="cc-step-content-card">
          <section className="cc-step-section">
            <div className="cc-step-section-title-row">
              <HiUserGroup size={20} color="#01988C" />
              <h2 className="cc-step-section-title">Quem te indicou</h2>
            </div>
            <div>
              <span className="cc-step4-subtitle">Foi indicado pelo programa <b>Conecta</b>?</span><br />
              <span className="cc-step4-subtitle">Informe aqui.</span>
            </div>


            <InputText
              label="Nome de quem indicou"
              placeholder="Nome completo"
              {...register("nome")}
              success={!!watch("nome")}
              fieldError={errors.nome}
            />

            <InputSelect
              label="Loja de quem te indicou"
              placeholder="Selecione a loja"
              value={watch("lojaId")}
              {...register("lojaId")}
              options={lojasDNA}
              fieldError={errors.lojaId}
            />

            <img className="step5-logo-conecta" src={logoConecta} alt="Logo Conecta" />

            <div className="cc-step-card-helper">
              <HiExclamationCircle />
              <span className="cc-step-card-helper-text">O <b>DNA Imóveis Conecta</b> é o nosso programa de indicação para corretores.
                Se alguém te indicou, essa pessoa recebe apoio na comissão da sua primeira venda na casa. Reconheça essa indicação..</span>
            </div>

          </section>
        </div>
      </div>
      <div className="cc-step1-footer">
        <button type="submit" onClick={onClickNotValid} className="cc-step1-footer-button">
          Ir para os termos e contrato
          <ArrowRight size={24} color="#ffffff" />
        </button>
      </div>
    </form>
  );
}
