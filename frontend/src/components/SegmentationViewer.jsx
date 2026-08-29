import { Layers3 } from "lucide-react";

export default function SegmentationViewer() {
    return <section className="segmentation-viewer"><div className="viewer-tabs"><button type="button" className="active">Original</button><button type="button" disabled>Predicted Mask</button><button type="button" disabled>Overlay</button></div><div className="future-mask"><Layers3 size={19} /><span>Segmentation visualization available when mask is returned by the API.</span></div></section>;
}
