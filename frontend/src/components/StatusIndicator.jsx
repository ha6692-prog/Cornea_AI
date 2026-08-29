import { Circle } from "lucide-react";

export default function StatusIndicator({ apiStatus, modelStatus, health }) {
    const online = apiStatus === "online" && modelStatus === true;
    return (
        <span className={`status-indicator ${online ? "is-online" : "is-offline"}`}>
            <Circle size={8} fill="currentColor" aria-hidden="true" />
            {apiStatus === "offline" ? "Backend Offline" : online ? "Model Online" : "Model Unavailable"}
            {health?.device && <span className="health-device">{health.device}</span>}
        </span>
    );
}
