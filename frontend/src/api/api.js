const API_URL = import.meta.env.VITE_API_URL;

async function request(url, options = {}, timeout = 60000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

export async function checkHealth() {
    if (!API_URL) throw new Error("API_URL_NOT_CONFIGURED");
    const response = await request(`${API_URL}/health`, {}, 15000);
    if (!response.ok) throw new Error("BACKEND_OFFLINE");
    const data = await response.json();
    if (!data || typeof data !== "object") throw new Error("MALFORMED_RESPONSE");
    return data;
}

export async function predictImage(file) {
    if (!API_URL) throw new Error("API_URL_NOT_CONFIGURED");
    const formData = new FormData();
    formData.append("file", file);
    const response = await request(`${API_URL}/predict`, { method: "POST", body: formData });
    if (!response.ok) throw new Error("PREDICTION_FAILED");
    const data = await response.json();
    if (!data || typeof data.prediction !== "string" || typeof data.confidence !== "number" || typeof data.ulcer_area_percent !== "number") throw new Error("MALFORMED_RESPONSE");
    return data;
}
