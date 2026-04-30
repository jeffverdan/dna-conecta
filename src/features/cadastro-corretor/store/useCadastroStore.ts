import { create } from "zustand";
import { persist } from "zustand/middleware";

type CadastroState = {
  currentStep: number;
  data: Record<string, unknown>;
  acceptedTerms: boolean;
  setStep: (step: number) => void;
  patchData: (v: Record<string, unknown>) => void;
  setAcceptedTerms: (v: boolean) => void;
  reset: () => void;
};

export const useCadastroStore = create<CadastroState>()(
  persist(
    (set) => ({
      currentStep: 0,
      data: {},
      acceptedTerms: false,
      setStep: (currentStep) => set({ currentStep }),
      patchData: (v) => set((s) => ({ data: { ...s.data, ...v } })),
      setAcceptedTerms: (acceptedTerms) => set({ acceptedTerms }),
      reset: () => set({ currentStep: 0, data: {}, acceptedTerms: false })
    }),
    { name: "cadastro-corretor-v1" }
  )
);
