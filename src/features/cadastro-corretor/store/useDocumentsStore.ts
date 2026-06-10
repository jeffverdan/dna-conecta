import { create } from "zustand";
import { persist } from "zustand/middleware";

type DocumentData = {
  name: string;
  base64: string;
};

type DocumentsState = DocumentData & {
  patchData: (v: Partial<DocumentData>) => void;
  reset: () => void;
};

function createDocumentStore(storageName: string) {
  return create<DocumentsState>()(
    persist(
      (set) => ({
        name: '',
        base64: '',
        patchData: (v: Partial<Pick<DocumentsState, "name" | "base64">>) => set(v),
        reset: () => set({ name: '', base64: '' })
      }),
      {
        name: storageName,
      }
    )
  );
}

export const useDocumentsStoreRGxCNH =
  createDocumentStore("doc_rg_cnh");

export const useDocumentsStoreResidencia =
  createDocumentStore("doc_residencia");

export const useDocumentsStoreDiploma =
  createDocumentStore("doc_diploma");

export const useDocumentsStoreFoto =
  createDocumentStore("fotoBase64");

// useCadastroStore((s) => s.patchData);
export const patchDocumentCNH = useDocumentsStoreRGxCNH.getState().patchData
export const patchDocumentResidencia = useDocumentsStoreResidencia.getState().patchData
export const patchDocumentDiploma = useDocumentsStoreDiploma.getState().patchData;
export const patchDocumentFoto = useDocumentsStoreFoto.getState().patchData;

export const getDataDocuments = () => ({
  doc_rg_cnh_base64:
    useDocumentsStoreRGxCNH.getState().base64,

  doc_rg_cnh_name:
    useDocumentsStoreRGxCNH.getState().name,

  doc_residencia_base64:
    useDocumentsStoreResidencia.getState().base64,

  doc_residencia_name:
    useDocumentsStoreResidencia.getState().name,

  doc_diploma_base64:
    useDocumentsStoreDiploma.getState().base64,

  doc_diploma_name:
    useDocumentsStoreDiploma.getState().name,

  fotoBase64:
    useDocumentsStoreFoto.getState().base64,

  fotoName:
    useDocumentsStoreFoto.getState().name,
});
