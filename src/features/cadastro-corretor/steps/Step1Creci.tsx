import { ArrowRight, User } from "lucide-react";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import InputText from "@/components/form/InputText";
import InputSelect from "@/components/form/InputSelect";
import { estadoCivilOptions, genderOptions, lojasDNA } from "../utils/constants";
import { formatCPFToInput, formatDateToInput, formatTelefoneToInput } from "../utils/functions";
import { useEffect } from "react";

const step1Schema = z.object({
  creci: z.string().min(2, "Informe o CRECI"),
  nomeCompleto: z.string().min(3, "Informe o nome"),
  apelido: z.string().min(2, "Informe o apelido"),
  dataNascimento: z.string().min(8, "Informe a data"),
  genero: z.string().min(1, "Selecione o genero"),
  estadoCivil: z.string().min(1, "Selecione o estado civil"),
  telefone: z.string().min(10, "Informe o telefone"),
  email: z.string().email("Email invalido"),
  cpf: z.string().min(11, "Informe o CPF"),
  rg: z.string().min(5, "Informe o RG"),
  orgaoEmissor: z.string().min(2, "Informe o orgao emissor"),
  inicioAtividades: z.string().min(8, "Informe a data"),
  lojaAtuacao: z.string().min(1, "Selecione a loja")
});

type Step1FormData = z.infer<typeof step1Schema>;

export function Step1Creci() {
  const setStep = useCadastroStore((s) => s.setStep);
  const patchData = useCadastroStore((s) => s.patchData);
  const data = useCadastroStore((s) => s.data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
    reset
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: data as Step1FormData
  });

  useEffect(() => {
    if (data) {
      reset(data as Step1FormData);
    }
  }, [data, reset]);

  const onSubmit = (values: Step1FormData) => {
    patchData(values);
    toast.success("Dados pessoais salvos");
    setStep(2);
  };

  const onClickNotValid = () => {
    // LEVA PARA O PRIMEIRO ERRO DO FORMULÁRIO
    console.log("Is Valid: ", isValid);

    if (isValid) return;
    const firstError = Object.keys(errors)[0];
    const element = document.querySelector(`[name="${firstError}"]`);
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
              <User size={20} color="#01988C" />
              <h2 className="cc-step-section-title">Dados pessoais</h2>
            </div>

            <InputText
              label="Numero do CRECI*"
              placeholder="Ex: RJ-027930/O"
              {...register("creci")}
              success={!!watch("creci")}
              fieldError={errors.creci}
            />

            <InputText
              label="Nome completo*"
              placeholder="Digite seu nome completo"
              {...register("nomeCompleto")}
              success={!!watch("nomeCompleto")}
              fieldError={errors.nomeCompleto}
            />

            <InputText
              label="Apelido*"
              placeholder="Aninha"
              {...register("apelido")}
              success={!!watch("apelido")}
              fieldError={errors.apelido}
            />

            <InputText
              label="Data de nascimento*"
              placeholder="dd/mm/aaaa"
              value={watch('dataNascimento')}
              {...register("dataNascimento", {
                setValueAs: (value) => formatDateToInput(value)
              })}
              success={!!watch("dataNascimento")}
              fieldError={errors.dataNascimento}
            />

            <InputSelect
              label="Gênero*"
              value={watch("genero")}
              {...register("genero")}
              options={genderOptions}
              fieldError={errors.genero}
            />

            <InputSelect
              label="Estado civil*"
              value={watch("estadoCivil")}
              {...register("estadoCivil")}
              options={estadoCivilOptions}
              fieldError={errors.estadoCivil}
            />
          </section>

          <section className="cc-step-section">
            <div className="cc-step1-section-label">Contato</div>
            <InputText
              label="Telefone*"
              value={watch('telefone')}
              placeholder="+55 (21) 99999-9999"
              {...register("telefone", {
                setValueAs: (value) => formatTelefoneToInput(value)
              })}
              success={!!watch("telefone")}
              fieldError={errors.telefone}
            />
            <InputText
              label="E-mail*"
              placeholder="seu@email.com"
              {...register("email")}
              success={!!watch("email")}
              fieldError={errors.email}
            />
          </section>

          <section className="cc-step-section">
            <div className="cc-step1-section-label">Identificação</div>
            <InputText
              label="CPF*"
              placeholder="000.000.000-00"
              value={watch('cpf')}
              {...register("cpf", {
                setValueAs: (value) => formatCPFToInput(value)
              })}
              success={!!watch("cpf")}
              fieldError={errors.cpf}
            />
            <InputText
              label="RG*"
              placeholder="00.000.000-0"
              {...register("rg")}
              success={!!watch("rg")}
              fieldError={errors.rg}
            />
            <InputText
              label="Orgao emissor*"
              placeholder="DETRAN-RJ"
              {...register("orgaoEmissor")}
              success={!!watch("orgaoEmissor")}
              fieldError={errors.orgaoEmissor}
            />
          </section>

          <section className="cc-step-section">
            <div className="cc-step1-section-label">Sobre a DNA Imoveis</div>
            <InputText
              label="Inicio das atividades*"
              placeholder="dd/mm/aaaa"
              value={watch('inicioAtividades')}
              {...register("inicioAtividades", {
                setValueAs: (value) => formatDateToInput(value)
              })}
              success={!!watch("inicioAtividades")}
              fieldError={errors.inicioAtividades}
            />

            <InputSelect
              label="Loja de atuação*"
              value={watch('lojaAtuacao')}
              {...register("lojaAtuacao")}
              options={lojasDNA}
              fieldError={errors.lojaAtuacao}
            />
          </section>
        </div>
      </div>

      <div className="cc-step1-footer">
        <button
          type="submit"
          // disabled={!isValid}
          onClick={onClickNotValid}
          className="cc-step1-footer-button"
        >
          Ir para o endereco
          <ArrowRight size={24} color="#ffffff" />
        </button>
      </div>
    </form>
  );
}
