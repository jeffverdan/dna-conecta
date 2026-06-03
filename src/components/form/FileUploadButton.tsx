import type { ChangeEventHandler } from "react";
import { CheckIcon, Upload } from "lucide-react";
import { HiOutlineXMark } from "react-icons/hi2";

type FileUploadButtonProps = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    accept?: string;
    name: string;
    fileName?: string;
    id?: string;
    label?: string;
    title?: string;
    disabled?: boolean;
    removeFile?: (name: string) => void;
};

export default function FileUploadButton({
    onChange,
    accept = "image/*, .pdf",
    name,
    fileName,
    id,
    label = "Escolha o arquivo",
    title,
    removeFile,
    disabled = false,
}: FileUploadButtonProps) {
    const inputId = id ?? name ?? "file-upload";

    return (
        <>
            {title && <label className="cc-step-upload">{title}</label>}
            {fileName ?
                <div className="cc-file-view">
                    <div className="cc-file-name">
                        <span>{fileName}</span>
                        <CheckIcon size={18} />
                    </div>
                    {removeFile &&
                        <button type="button" className="cc-file-name-button" onClick={() => removeFile(name)}>
                            <HiOutlineXMark size={24} />
                        </button>
                    }
                </div>
                :
                <label htmlFor={inputId} className="cc-file-upload">
                    <Upload size={18} />
                    <span>{label}</span>
                    <input
                        id={inputId}
                        name={name}
                        type="file"
                        accept={accept}
                        disabled={disabled}
                        onChange={onChange}
                    />
                </label>
            }
        </>
    );
}
