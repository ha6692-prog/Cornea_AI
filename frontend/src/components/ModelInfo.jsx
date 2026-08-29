const details = [["Architecture", "U-Net++"], ["Encoder", "ResNet-50"], ["Input", "3-channel RGB"], ["Resolution", "256 x 256"], ["Task", "Semantic segmentation"], ["Threshold", "0.5"], ["Inference", "FastAPI"], ["Weights", "unetpp_resnet50_best_final.pth"]];

export default function ModelInfo() {
    return <section className="model-section"><div className="section-heading"><p className="kicker">Configuration / 03</p><h2>Model information</h2></div><dl className="model-grid">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>;
}
