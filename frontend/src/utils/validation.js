const allowedTypes = new Set(["image/jpeg", "image/png"]);
const allowedExtensions = /\.(jpe?g|png)$/i;

export function validateImage(file) {
    if (!file) return { valid: false, error: "PLEASE SELECT AN IMAGE." };
    if (!allowedTypes.has(file.type) && !allowedExtensions.test(file.name)) return { valid: false, error: "PLEASE UPLOAD A JPG, JPEG, OR PNG IMAGE." };
    if (file.size > 10 * 1024 * 1024) return { valid: false, error: "FILE EXCEEDS 10MB LIMIT." };
    return { valid: true, error: "" };
}

export function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
