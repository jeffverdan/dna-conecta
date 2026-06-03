import type { ChangeEventHandler } from "react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import imageCompression from "browser-image-compression";
import FileUploadButton from "./FileUploadButton";
import { HiOutlineXMark } from "react-icons/hi2";

type FileUploadOrPhotoProps = {
    title?: string;
    subtitle?: string;
    accept?: string;
    name: string;
    fileLabel?: string;
    photoLabel?: string;
    onChange: (base64: string) => void;
};

export default function FileUploadOrPhoto({
    title,
    subtitle,
    name,
    accept = "image/*",
    fileLabel = "Escolha o arquivo",
    photoLabel = "Tire foto",
    onChange,
}: FileUploadOrPhotoProps) {
    const webcamRef = useRef<Webcam>(null);
    const [preview, setPreview] = useState<string>("");
    const [takePhotoMode, setTakePhotoMode] = useState(false);

    const upload: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];        
        if (!file) return;

        const compressed = await imageCompression(file, {
            maxSizeMB: 0.6,
            maxWidthOrHeight: 1200,
        });

        const base64 = await imageCompression.getDataUrlFromFile(compressed);        
        setPreview(base64);
        onChange(base64);
    };

    const capturePhoto = () => {
        const img = webcamRef.current?.getScreenshot();
        if (!img) return;
        setPreview(img);
        onChange(img);
    };

    return (
        <>
            {title && <label className="cc-step-upload">{title}</label>}
            {subtitle && <span className="cc-step-upload-subtitle">{subtitle}</span>}

            {!takePhotoMode
                ?
                <div className="cc-file-photo-box">                    
                    <div className="cc-file-photo-actions">
                        <FileUploadButton name={name} accept={accept} label={fileLabel} onChange={upload} />

                        <span className="cc-file-photo-divider">OU</span>
                        <button type="button" className="cc-photo-button cc-photo-button--photo" onClick={() => setTakePhotoMode(true)}>
                            <Camera size={18} />
                            {photoLabel}
                        </button>
                    </div>
                </div>
                :
                <div className="cc-photo-camera-wrapper">
                    <HiOutlineXMark size={24} className="cc-photo-close" onClick={() => setTakePhotoMode(false)} />
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="cc-photo-camera"
                        videoConstraints={{ facingMode: "user" }}
                    />

                    <button type="button" className="cc-photo-button cc-photo-button--photo" onClick={capturePhoto}>
                        <Camera size={18} />
                        Capturar Foto
                    </button>
                </div>
            }
            {preview && <img src={preview} className="cc-photo-preview" />}
            
        </>
    );
}
