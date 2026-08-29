export default function Marquee() {
    const content = "CORNEA VISION / U-NET++ / RESNET-50 / FLUORESCEIN IMAGING / SEMANTIC SEGMENTATION / AI-ASSISTED SCREENING / ";
    return <div className="marquee" aria-hidden="true"><div className="marquee-track">{content}{content}</div></div>;
}
