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
    value?: string;
    fileLabel?: string;
    photoLabel?: string;
    onChange: (base64: string, name: string) => void;
};

export default function FileUploadOrPhoto({
    title,
    subtitle,
    name,
    value = "",
    accept = "image/*",
    fileLabel = "Escolha o arquivo",
    photoLabel = "Tire foto",
    onChange,
}: FileUploadOrPhotoProps) {
    const webcamRef = useRef<Webcam>(null);
    const [preview, setPreview] = useState<string>(value);
    const [takePhotoMode, setTakePhotoMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const upload: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setProgress(0);

        try {
            const compressed = await imageCompression(file, {
                maxSizeMB: 0.6,
                maxWidthOrHeight: 1200,
                onProgress: (p: number) => setProgress(Math.round(p)),
            });

            const base64 = await imageCompression.getDataUrlFromFile(compressed);
            setPreview(base64);
            onChange(base64, file.name);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
    };

    const capturePhoto = () => {
        const img = webcamRef.current?.getScreenshot();
        if (!img) return;
        setPreview(img);
        onChange(img, "camera.jpg");
    };

    return (
        <>
            {title && <label className="cc-step-upload">{title}</label>}
            {subtitle && <span className="cc-step-upload-subtitle">{subtitle}</span>}

            {!preview ?
                !takePhotoMode ?
                    <div className="cc-file-photo-box">
                        {isLoading ? (
                            <div className="cc-upload-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, width: '100%' }}>
                                <div style={{ height: 10, background: '#eee', borderRadius: 6, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${progress}%`, background: '#3b82f6', transition: 'width 120ms linear' }} />
                                </div>
                                <div style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>Carregando... {progress}%</div>
                            </div>
                        ) : (
                            <div className="cc-file-photo-actions">
                                <FileUploadButton name={name} accept={accept} label={fileLabel} onChange={upload} />

                                <span className="cc-file-photo-divider">OU</span>
                                <button type="button" className="cc-photo-button cc-photo-button--photo" onClick={() => setTakePhotoMode(true)}>
                                    <Camera size={18} />
                                    {photoLabel}
                                </button>
                            </div>
                        )}
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
                :
                <div className="cc-photo-camera-wrapper">
                    <HiOutlineXMark size={24} className="cc-photo-close" onClick={() => setPreview("")} />
                    <img src={preview} className="cc-photo-camera" />
                </div>
            }

        </>
    );
}
