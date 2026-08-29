import MetricCard from "./MetricCard";
import SegmentationViewer from "./SegmentationViewer";

export default function AnalysisResult({ result, health }) {
    if (!result) return <div className="result-empty"><span className="empty-cross">+</span><h2>Waiting for analysis</h2><p>Upload an image and run the model to see returned measurements.</p></div>;
    const detected = result.prediction === "Ulcer Detected";
    return <div className="result-content"><div className={`prediction ${detected ? "detected" : "clear"}`}><span>Prediction</span><strong>{result.prediction}</strong></div><div className="metrics-grid"><MetricCard label="Confidence" value={`${result.confidence}%`} /><MetricCard label="Estimated ulcer area" value={`${result.ulcer_area_percent}%`} /></div><div className="area-bar" aria-label={`Estimated ulcer area ${result.ulcer_area_percent}%`}><span style={{ width: `${Math.min(Math.max(Number(result.ulcer_area_percent) || 0, 0), 100)}%` }} /></div><SegmentationViewer /><div className="result-summary"><span>Model <b>UNet++ / ResNet-50</b></span><span>Input <b>256 x 256</b></span><span>Backend <b>FastAPI</b></span><span>Device <b>{health?.device || "Not reported"}</b></span></div></div>;
}
