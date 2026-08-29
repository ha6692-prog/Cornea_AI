import { useEffect, useState } from "react";
import { predictImage } from "./api/api";
import About from "./components/About";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import Disclaimer from "./components/Disclaimer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImagePreview from "./components/ImagePreview";
import ImageUploader from "./components/ImageUploader";
import Marquee from "./components/Marquee";
import ModelInfo from "./components/ModelInfo";
import Pipeline from "./components/Pipeline";
import TechnicalCards from "./components/TechnicalCards";
import { useApiHealth } from "./hooks/useApiHealth";
import { validateImage } from "./utils/validation";

export default function App() {
    const { health, apiStatus, modelStatus } = useApiHealth();
    const [theme, setTheme] = useState(() => localStorage.getItem("corneaai-theme") || "dark");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("corneaai-theme", theme);
    }, [theme]);

    useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

    function handleFileSelect(selectedFile) {
        const validation = validateImage(selectedFile);
        if (!validation.valid) return setError(validation.error);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResult(null);
        setError("");
    }

    function clearFile() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError("");
    }

    async function handleAnalyze() {
        if (!file || loading) return;
        if (apiStatus !== "online") return setError("UNABLE TO CONNECT TO THE FASTAPI BACKEND.");
        if (!modelStatus) return setError("THE INFERENCE MODEL IS CURRENTLY UNAVAILABLE.");
        setLoading(true);
        setError("");
        setResult(null);
        try {
            setResult(await predictImage(file));
        } catch (requestError) {
            console.error("Prediction error:", requestError);
            setError(requestError.message === "MALFORMED_RESPONSE" ? "THE SERVER RETURNED AN INVALID RESPONSE." : requestError.name === "AbortError" ? "REQUEST FAILED. PLEASE TRY AGAIN." : "PREDICTION FAILED. PLEASE TRY AGAIN.");
        } finally {
            setLoading(false);
        }
    }

    return <div className="app-shell">
        <Header apiStatus={apiStatus} health={health} modelStatus={modelStatus} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
        <main>
            <Hero />
            <section className="analysis-section" id="analysis"><div className="analysis-heading"><span className="eyebrow">ANALYSIS / LIVE WORKSPACE</span><h2>EXAMINE.<br />PROCESS.<br />READ.</h2></div><div className="analysis-workspace"><form className="input-panel" onSubmit={(event) => { event.preventDefault(); handleAnalyze(); }}>{file ? <ImagePreview file={file} previewUrl={previewUrl} onClear={clearFile} /> : <ImageUploader onFile={handleFileSelect} disabled={loading} />}<AnalyzeButton loading={loading} disabled={!file || loading || apiStatus !== "online" || !modelStatus} />{error && !loading && <p className="error-copy" role="alert">{error}</p>}</form><section className="result-panel"><div className="panel-heading"><span>AI ANALYSIS / 02</span><small>Returned by FastAPI</small></div><AnalysisResult result={result} health={health} /></section></div></section>
            <TechnicalCards health={health} />
            <Marquee />
            <div id="pipeline"><Pipeline loading={loading} /></div>
            <div id="model"><ModelInfo /></div>
            <About />
            <Disclaimer />
        </main>
        <Footer />
    </div>;
}
