import imageCompression from "browser-image-compression";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";
import { useForm } from "react-hook-form";
import { docsSchema } from "../schemas/cadastroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { HiDocumentDuplicate } from "react-icons/hi";
import FileUploadButton from "@/components/form/FileUploadButton";
import FileUploadOrPhoto from "@/components/form/FileUploadOrPhoto";
import { patchDocumentCNH, patchDocumentResidencia, patchDocumentDiploma, patchDocumentFoto, getDataDocuments } from "../store/useDocumentsStore";

type FormData = z.infer<typeof docsSchema>;

export function Step4Foto() {  
  const setStep = useCadastroStore((s) => s.setStep);
  const data = useCadastroStore((s) => s.data);

  const {    
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },    
  } = useForm<FormData>({
    resolver: zodResolver(docsSchema),
    mode: "onChange",
    defaultValues: {...data, ...getDataDocuments()} as FormData
  });

  console.log("DataDocs: ", getDataDocuments());
  console.log("watch: ", watch());

  const upload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("File: ", file);
    console.log("Event Name: ", e.target.name);
    const name = e.target.name as keyof FormData;
    const fileName = file.name;

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64 = event.target?.result as string;
        setValue(name, base64, { shouldValidate: true });
        setValue(`${name.replace("_base64", "_name")}` as keyof FormData, fileName);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("image/")) {
      const compressed = await imageCompression(file, { maxSizeMB: 0.6, maxWidthOrHeight: 1200 });
      const base64 = await imageCompression.getDataUrlFromFile(compressed);
      setValue(name, base64, { shouldValidate: true });
      setValue(`${name.replace("_base64", "_name")}` as keyof FormData, fileName);
    } else {
      alert("Tipo de arquivo não suportado. Por favor, envie uma imagem ou PDF.");
    }
  };

  const removeFile = (name: string) => {    
    setValue(name as keyof FormData, "", { shouldValidate: true });
    setValue(`${name.replace("_base64", "_name")}` as keyof FormData, "");
  };

  const onSubmit = (v: FormData) => {
    // patchData({ ...v });
    console.log("Submit Data: ", v);
    patchDocumentCNH({ base64: v.doc_rg_cnh_name, name: v.doc_rg_cnh_name });
    patchDocumentResidencia({ base64: v.doc_residencia_name, name: v.doc_residencia_name });
    patchDocumentDiploma({ base64: v.doc_diploma_name, name: v.doc_diploma_name });
    patchDocumentFoto({ base64: v.fotoBase64, name: v.fotoName });
    setStep(5);
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

  const handleFileOrPhotoChange = (base64: string, name: string) => {
    setValue("fotoBase64", base64, { shouldValidate: true });
    setValue("fotoName", name, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cc-step-form">
      <div className="cc-step-layout">
        <div className="cc-step-content-card">
          <section className="cc-step-section step4">
            <div className="cc-step-section-title-row">
              <HiDocumentDuplicate size={20} color="#01988C" />
              <h2 className="cc-step-section-title">Envio de documentos</h2>
            </div>
            <p className="cc-step4-subtitle">Envie documentos legíveis:</p>

            {/* COMPONENTE PARA UPLOAD DE RG OU CNH */}
            <FileUploadButton
              title="1. Documento com foto (RG ou CNH)*"
              label="Escolha o arquivo"
              name="doc_rg_cnh_base64"
              removeFile={removeFile}
              fileName={watch("doc_rg_cnh_name")}
              onChange={upload}
            />

            {/* COMPONENTE PARA UPLOAD DE COMPROVANTE DE RESIDÊNCIA */}
            <FileUploadButton
              title="2. Comprovante de residência*"
              label="Escolha o arquivo"
              name="doc_residencia_base64"
              removeFile={removeFile}
              fileName={watch("doc_residencia_name")}
              onChange={upload}
            />


            {/* COMPONENTE PARA UPLOAD DE DIPLOMA */}
            <FileUploadButton
              title="3. Certificado de 2º grau (opcional)"
              label="Escolha o arquivo"
              name="doc_diploma_base64"
              removeFile={removeFile}
              fileName={watch("doc_diploma_name")}
              onChange={upload}
            />


            <FileUploadOrPhoto
              title="4. Upload de foto*"
              subtitle="Envie uma foto do seu rosto ou tire uma agora. Isso nos ajuda a validar seus documentos."
              accept="image/*"
              name="fotoBase64"
              fileLabel="Escolha o arquivo"
              photoLabel="Tire foto"
              value={watch("fotoBase64")}
              onChange={handleFileOrPhotoChange}
            />
          </section>
        </div>
      </div>

      <div className="cc-step1-footer">
        <button type="submit" onClick={onClickNotValid} className="cc-step1-footer-button">
          Ir para indicação
          <ArrowRight size={24} color="#ffffff" />
        </button>
      </div>
    </form>
  );
}
