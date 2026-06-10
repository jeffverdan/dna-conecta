import { useForm } from "react-hook-form";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import InputText from "@/components/form/InputText";
import { formatCNPJToInput, formatCPFToInput, formatTelefoneToInput, isCNPJValid, isCPFValid } from "../utils/functions";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import { pagamentoSchema } from "../schemas/cadastroSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputRadioGroup from "@/components/form/RadioGroup";
import { useEffect, useState } from "react";
import { fetchBanks } from "@/services/banks";
import AutoCompleteVirtualize, { ValueAutocompleteType } from "@/components/form/AutoCompleteVirtualization";
import { toast } from "sonner";

const detect = (v: string | undefined) =>
  !v ? undefined :
    /@/.test(v) ? "Email" :
      /^\d{11}$/.test(v.replace(/\D/g, "")) ? isCPFValid(v) ? "CPF" : "Telefone" :
        /^\d{14}$/.test(v.replace(/\D/g, "")) ? isCNPJValid(v) ? "CNPJ" : undefined :
          /^\+?\d{10,13}$/.test(v.replace(/\D/g, "")) ? "Telefone" :
            undefined;

type FormData = z.infer<typeof pagamentoSchema>;

export function Step3Pix() {
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
    resolver: zodResolver(pagamentoSchema),
    mode: "onChange",
    defaultValues: data as FormData
  });

  useEffect(() => {
    if (data) {
      SETRADIO_OPTIONS(e => e.map((item) => ({...item, checked: data.metodo === item.value})))
      reset(data as FormData);
    }
  }, [data, reset]);

  const { pix, metodo } = watch();
  const [bankOptions, setBankOptions] = useState<{ id: string; name: string }[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  useEffect(() => {
    const loadBanks = async () => {
      setLoadingBanks(true);
      try {
        const banks = await fetchBanks();
        setBankOptions(
          banks
            .slice()
            .filter(e => e.code && e.name)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((bank) => ({ id: bank.code.toString(), name: bank.name }))
        );
      } catch (error) {
        setBankOptions([]);
      } finally {
        setLoadingBanks(false);
      }
    };

    loadBanks();
  }, []);

  const onSubmit = (v: FormData) => {
    patchData({ ...v, pixTipo: detect(v.pix) });
    toast.success("Dados bancários salvo");
    setStep(4);
  };

  const formatPix = (v: string | undefined) => {
    if (!v) return v;
    if (detect(v) === "CPF") {
      return formatCPFToInput(v)
    } else if (detect(v) === "Telefone") {
      return formatTelefoneToInput(v);
    } else if (detect(v) === "CNPJ") {
      return formatCNPJToInput(v);
    } else {
      // LIMPA FORMATAÇÃO CNPJ
      return v.replace(/\D/g, "");
    }
  };

  const onClickNotValid = () => {
    if (isValid) return;

    const firstError = Object.keys(errors)[0] as keyof FormData | undefined;
    console.log("Erro: ", errors);
    
    if (!firstError) return;

    const addressAutoFields = ["rua", "bairro", "cidade", "estado"];
    const targetField = addressAutoFields.includes(firstError) ? "cep" : firstError;
    const element = document.querySelector(`[name="${targetField}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      (element as HTMLElement).focus();
    }
  };
  
  const [RADIO_OPTIONS, SETRADIO_OPTIONS] = useState([
    { label: "PIX", value: "pix", disabled: false, checked: true },
    { label: "Banco", value: "banco", disabled: false, checked: false },
  ]);

  const onChangeBank = (_event: React.SyntheticEvent, value: ValueAutocompleteType | null) => {
    setValue('banco', value)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cc-step-form">
      <div className="cc-step-layout">
        <div className="cc-step-content-card">
          <section className="cc-step-section">

            <div className="cc-step-section-title-row">
              <CircleDollarSign size={20} color="#01988C" />
              <h2 className="cc-step-section-title">Dados bancários</h2>
            </div>

            <p>Informe seus dados para receber suas comissões.</p>

            <InputRadioGroup
              label="Forma de pagamento"
              name="metodo"
              value={watch('metodo')}
              options={RADIO_OPTIONS}
              setOptions={SETRADIO_OPTIONS}
              setValue={setValue}
            />

            {metodo === "pix" && <>
              <div className="cc-input-grid">
                <InputText
                  label="Chave PIX"
                  placeholder="Digite sua chave PIX"
                  value={watch("pix")}
                  {...register("pix", {
                    required: true,
                    setValueAs: (v) => formatPix(v)
                  })}
                  fieldError={errors.pix}
                />
              </div>
              {detect(pix) && <span className="cc-chip">Tipo detectado: {detect(pix)}</span>}
            </>}

            {metodo === "banco" && <>
              <div className="cc-input-grid">
                <AutoCompleteVirtualize
                  value={watch('banco') || null}
                  options={bankOptions}
                  onChange={onChangeBank}
                  label={"Instituição / Banco"}
                />
              </div>

              {loadingBanks && <p>Carregando bancos...</p>}

              <div className="cc-input-grid">
                <InputText
                  label="Agência"
                  placeholder="Digite o número da agência"
                  {...register("agencia")}
                  success={!!watch('agencia')}
                  fieldError={errors.agencia}
                />
                <InputText
                  label="Conta"
                  placeholder="Digite o número da conta"
                  {...register("conta")}
                  success={!!watch('conta')}
                  fieldError={errors.conta}
                />
                <InputText
                  label="Tipo de conta"
                  placeholder="Corrente, Poupança..."
                  {...register("contaTipo")}
                  success={!!watch('contaTipo')}
                  fieldError={errors.contaTipo}
                />
              </div>
            </>}

          </section>
        </div>
      </div>

      <div className="cc-step1-footer">
        <button type="submit" onClick={onClickNotValid} className="cc-step1-footer-button">
          Ir para upload de documentos
          <ArrowRight size={24} color="#ffffff" />
        </button>
      </div>
    </form>
  );
}
