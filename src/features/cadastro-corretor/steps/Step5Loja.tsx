// import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";

export function Step5Loja() {
  // const patchData = useCadastroStore((s) => s.patchData);
  // const setStep = useCadastroStore((s) => s.setStep);

  return (
    <section className="cc-step-card">
      <h1 className="cc-step-title">Etapa 5: Loja</h1>
      <p className="cc-step-subtitle">Selecione a unidade mais conveniente.</p>
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
  );
}
