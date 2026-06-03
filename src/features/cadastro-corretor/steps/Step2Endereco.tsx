import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enderecoSchema } from "@/features/cadastro-corretor/schemas/cadastroSchema";
import { z } from "zod";
import { toast } from "sonner";
import InputText from "@/components/form/InputText";
import { fetchViaCep } from "@/services/viacep";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { useEffect } from "react";

type FormData = z.infer<typeof enderecoSchema>;

export function Step2Endereco() {
  const patchData = useCadastroStore((s) => s.patchData);
  const setStep = useCadastroStore((s) => s.setStep);

  const data = useCadastroStore((s) => s.data);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(enderecoSchema),
    mode: "onChange",
    defaultValues: data as FormData
  });

  useEffect(() => {
    if (data) {
      reset(data as FormData);
    }
  }, [data, reset]);

  const cep = watch("cep");
  const rua = watch("rua");
  const bairro = watch("bairro");
  const cidade = watch("cidade");
  const estado = watch("estado");

  const loadCep = async () => {
    const cepDigits = (cep || "").replace(/\D/g, "");

    if (cepDigits.length !== 8) {
      setValue("rua", "", { shouldValidate: true });
      setValue("bairro", "", { shouldValidate: true });
      setValue("cidade", "", { shouldValidate: true });
      setValue("estado", "", { shouldValidate: true });
      return;
    }

    try {
      const r = await fetchViaCep(cepDigits);

      if (!r.erro) {
        setValue("rua", r.logradouro || "", { shouldValidate: true });
        setValue("bairro", r.bairro || "", { shouldValidate: true });
        setValue("cidade", r.localidade || "", { shouldValidate: true });
        setValue("estado", r.uf || "", { shouldValidate: true });
      } else {
        setValue("rua", "", { shouldValidate: true });
        setValue("bairro", "", { shouldValidate: true });
        setValue("cidade", "", { shouldValidate: true });
        setValue("estado", "", { shouldValidate: true });
        toast.error("CEP não encontrado");
      }
    } catch {
      toast.error("Não foi possível consultar o CEP");
    }
  };

  const onSubmit = (v: FormData) => {
    patchData(v);
    toast.success("Endereço salvo");
    setStep(3);
  };

  const onClickNotValid = () => {
    if (isValid) return;

    const firstError = Object.keys(errors)[0] as keyof FormData | undefined;
    if (!firstError) return;

    const addressAutoFields = ["rua", "bairro", "cidade", "estado"];
    const targetField = addressAutoFields.includes(firstError) ? "cep" : firstError;
    const element = document.querySelector(`[name="${targetField}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      (element as HTMLElement).focus();
    }
  };

  const formatCepToInput = (value: string) => {
    if (!value) return "";
    const cepDigits = value.replace(/\D/g, "").slice(0, 8);
    if (cepDigits.length <= 5) return cepDigits;
    return `${cepDigits.slice(0, 5)}-${cepDigits.slice(5)}`;
  };

  const enderecoLinha1 = rua ? `${rua}${watch("numero") ? `, ${watch("numero")}` : ""}` : "";
  const enderecoLinha2 = bairro && estado ? `${bairro} - ${estado}` : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cc-step-form">
      <div className="cc-step-layout">
        <div className="cc-step-content-card">
          <section className="cc-step-section">
            <div className="cc-step-section-title-row">
              <Building2 size={20} color="#01988C" />
              <h2 className="cc-step-section-title">Endereço</h2>
            </div>

            <InputText
              label="CEP*"
              placeholder="00000-000"
              value={cep}
              {...register("cep", {
                setValueAs: (value) => formatCepToInput(value)
              })}
              onBlurFunction={loadCep}
              success={(cep || "").replace(/\D/g, "").length === 8}
              fieldError={errors.cep}
            />

            <input type="hidden" {...register("rua")} />
            <input type="hidden" {...register("bairro")} />
            <input type="hidden" {...register("cidade")} />
            <input type="hidden" {...register("estado")} />

            <div className="cc-step2-address-preview">
              <MapPin size={20} color="#01988C" />
              <div className="cc-step2-address-preview-texts">
                <span className="cc-step2-address-line1">{enderecoLinha1}</span>
                <span className="cc-step2-address-line2">{enderecoLinha2}</span>
                {!cidade && errors.rua && <span className="cc-step2-address-error">Preencha um CEP válido para carregar o endereço.</span>}
              </div>
            </div>

            <InputText
              label="Unidade"
              placeholder="Apartamento"
              {...register("numero")}
              success={!!watch("numero")}
              fieldError={errors.numero}
            />

            <InputText
              label="Complemento"
              placeholder="Bloco, lote ou condomínio"
              {...register("complemento")}
              success={!!watch("complemento")}
              fieldError={errors.complemento}
            />
          </section>
        </div>
      </div>

      <div className="cc-step1-footer">
        <button type="submit" onClick={onClickNotValid} className="cc-step1-footer-button">
          Ir para os dados bancários
          <ArrowRight size={24} color="#ffffff" />
        </button>
      </div>
    </form>
  );
}
