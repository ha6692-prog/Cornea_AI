const stages = ["Image input", "Preprocessing", "U-Net++", "Probability map", "Result"];

export default function Pipeline({ loading }) {
    return <section className={`pipeline-section ${loading ? "is-running" : ""}`}><div className="section-heading"><p className="kicker">Processing chain / 02</p><h2>From image to segmentation</h2></div><div className="pipeline">{stages.map((stage, index) => <div className="pipeline-stage" key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>{index < stages.length - 1 && <i aria-hidden="true" />}</div>)}</div></section>;
}
