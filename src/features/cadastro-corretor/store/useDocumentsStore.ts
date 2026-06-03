import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DocumentsState = {
  name: string;
  base64: string;
  patchData: (v: Record<string, unknown>) => void;  
  reset: () => void;
};

export const useDocumentsStoreRGxCNH = create<DocumentsState>()(
  persist(
    (set) => ({
      name: '',
      base64: '',      
      patchData: () => set((s) => ({ base64: s.base64, name: s.name })),
      reset: () => set({ name: '', base64: '' })
    }),
    { name: "doc_rg_cnh" }
  )
);

export const useDocumentsStoreResidencia = create<DocumentsState>()(
  persist(
    (set) => ({
      name: '',
      base64: '',      
      patchData: () => set((s) => ({ base64: s.base64, name: s.name })),
      reset: () => set({ name: '', base64: '' })
    }),
    { name: "doc_residencia" }
  )
);

export const useDocumentsStoreDiploma = create<DocumentsState>()(
  persist(
    (set) => ({
      name: '',
      base64: '',      
      patchData: () => set((s) => ({ base64: s.base64, name: s.name })),
      reset: () => set({ name: '', base64: '' })
    }),
    { name: "doc_diploma" }
  )
);

export const useDocumentsStoreFoto = create<DocumentsState>()(
  persist(
    (set) => ({
      name: '',
      base64: '',      
      patchData: () => set((s) => ({ base64: s.base64, name: s.name })),
      reset: () => set({ name: '', base64: '' })
    }),
    { name: "fotoBase64" }
  )
);

export const patchDocumentCNH = useDocumentsStoreRGxCNH.getState().patchData;
export const patchDocumentResidencia = useDocumentsStoreResidencia.getState().patchData;
export const patchDocumentDiploma = useDocumentsStoreDiploma.getState().patchData;
export const patchDocumentFoto = useDocumentsStoreFoto.getState().patchData;

export const dataDocuments = {
    doc_rg_cnh_base64: useDocumentsStoreRGxCNH.getState().base64,
    doc_rg_cnh_name: useDocumentsStoreRGxCNH.getState().name,
    doc_residencia_base64: useDocumentsStoreResidencia.getState().base64,
    doc_residencia_name: useDocumentsStoreResidencia.getState().name,
    doc_diploma_base64: useDocumentsStoreDiploma.getState().base64,
    doc_diploma_name: useDocumentsStoreDiploma.getState().name,
    fotoBase64: useDocumentsStoreFoto.getState().base64,
    fotoName: useDocumentsStoreFoto.getState().name,    
}
