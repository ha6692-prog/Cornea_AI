import { useCallback, useEffect, useState } from "react";
import { checkHealth } from "../api/api";

export function useApiHealth() {
    const [health, setHealth] = useState(null);
    const [apiStatus, setApiStatus] = useState("checking");

    const refresh = useCallback(async () => {
        try {
            const payload = await checkHealth();
            setHealth(payload);
            setApiStatus("online");
        } catch (error) {
            console.error("Health check failed:", error);
            setHealth(null);
            setApiStatus("offline");
        }
    }, []);

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 30000);
        return () => clearInterval(interval);
    }, [refresh]);

    return { health, apiStatus, modelStatus: Boolean(health?.model_available), refresh };
}
