import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { indicacaoSchema } from "../schemas/cadastroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { HiUserGroup } from "react-icons/hi";


type FormData = z.infer<typeof indicacaoSchema>;

export function Step5Loja() {
  const patchData = useCadastroStore((s) => s.patchData);
  const setStep = useCadastroStore((s) => s.setStep);
  const data = useCadastroStore((s) => s.data);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { isValid, errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(indicacaoSchema),
    mode: "onChange",
    defaultValues: data as FormData
  });

  console.log("Watch: ", watch());

  const onSubmit = (v: FormData) => {
    patchData({ ...v });
    setStep(4);
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
            <p className="cc-step4-subtitle">Selecione a unidade mais conveniente.</p>


            <div className="cc-list">
              {/* {LOJAS.map((l) => (
          <button key={l.id} className="cc-list-button" onClick={() => { patchData({ loja: l }); setStep(6); }}>
            <p className="cc-list-name">{l.nome}</p>
            <p className="cc-list-meta">{l.bairro} - {l.cidade}</p>
            <p className="cc-list-distance">{l.distancia}</p>
          </button>
        ))} */}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
