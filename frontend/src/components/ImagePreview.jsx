import { FileImage, X } from "lucide-react";
import { formatFileSize } from "../utils/validation";

export default function ImagePreview({ file, previewUrl, onClear }) {
    return (
        <div className="preview-wrap">
            <div className="imaging-viewport"><img src={previewUrl} alt={`Selected corneal image: ${file.name}`} /></div>
            <div className="file-meta"><span><FileImage size={16} />{file.name}</span><small>{formatFileSize(file.size)}</small><button type="button" className="icon-button" onClick={onClear} aria-label="Remove selected image" title="Remove image"><X size={17} /></button></div>
        </div>
    );
}
