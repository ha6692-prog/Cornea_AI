import { ArrowUpRight, LoaderCircle } from "lucide-react";

export default function AnalyzeButton({ loading, disabled }) {
    return <button className="analyze-button" type="submit" disabled={disabled || loading}>{loading ? <><LoaderCircle className="spin" size={18} /> Running U-Net++...</> : <>Analyze image <ArrowUpRight size={19} /></>}</button>;
}
