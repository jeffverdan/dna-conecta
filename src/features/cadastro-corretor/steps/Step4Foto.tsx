import Webcam from "react-webcam";
import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { useCadastroStore } from "@/features/cadastro-corretor/store/useCadastroStore";

export function Step4Foto() {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string>("");
  const patchData = useCadastroStore((s) => s.patchData);
  const setStep = useCadastroStore((s) => s.setStep);

  const capture = async () => {
    const img = webcamRef.current?.getScreenshot();
    if (!img) return;
    setPreview(img);
    patchData({ fotoBase64: img });
  };

  const upload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await imageCompression(file, { maxSizeMB: 0.6, maxWidthOrHeight: 1200 });
    const base64 = await imageCompression.getDataUrlFromFile(compressed);
    setPreview(base64);
    patchData({ fotoBase64: base64 });
  };

  return (
    <section className="cc-step-card">
      <h1 className="cc-step-title">Etapa 4: Foto</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="cc-photo-camera" videoConstraints={{ facingMode: "user" }} />
      <div className="cc-photo-actions">
        <button type="button" className="cc-photo-button" onClick={capture}>Tirar foto</button>
        <label className="cc-photo-upload">
          Upload
          <input type="file" accept="image/*" className="cc-photo-file" onChange={upload} />
        </label>
      </div>
      {preview && <img src={preview} className="cc-photo-preview" />}
      <button className="cc-primary-button" onClick={() => setStep(5)}>Continuar</button>
    </section>
  );
}
