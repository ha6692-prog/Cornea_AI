import { useState } from "react";
import { ImagePlus, UploadCloud } from "lucide-react";

export default function ImageUploader({ onFile, disabled }) {
    const [dragging, setDragging] = useState(false);
    function handleDrop(event) {
        event.preventDefault();
        setDragging(false);
        if (!disabled) onFile(event.dataTransfer.files?.[0]);
    }
    return (
        <label className={`upload-zone ${dragging ? "dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
            <input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={(event) => { onFile(event.target.files?.[0]); event.target.value = ""; }} disabled={disabled} />
            <span className="upload-icon"><UploadCloud size={25} /></span>
            <strong>Drop fluorescein image here</strong>
            <span>or browse from your device</span>
            <small>JPG / JPEG / PNG, up to 10 MB</small>
            <ImagePlus className="upload-corner" size={18} aria-hidden="true" />
        </label>
    );
}
