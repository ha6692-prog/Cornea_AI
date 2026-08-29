import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="hero">
            <p className="kicker">Slit-lamp research instrument / 01</p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>CORNEAL<br />ULCER<br /><em>ANALYSIS.</em></motion.h1>
            <div className="hero-secondary">FROM IMAGE / TO SEGMENTATION.</div>
            <p className="hero-copy">Send a fluorescein or slit-lamp image to a trained U-Net++ model with a ResNet-50 encoder for AI-assisted screening. This research prototype supports review; it does not diagnose.</p>
            <div className="tech-badges"><span>U-NET++ / RESNET-50</span><span>256 x 256 INFERENCE</span><span>SEMANTIC SEGMENTATION</span><span>FASTAPI INFERENCE</span><span>RESEARCH PROTOTYPE</span></div>
            <button className="hero-cta" type="button" onClick={() => document.getElementById("analysis")?.scrollIntoView({ behavior: "smooth" })}><ArrowDownRight size={18} /> ANALYZE IMAGE</button>
        </section>
    );
}
