import { Activity } from "lucide-react";
import StatusIndicator from "./StatusIndicator";
import ThemeToggle from "./ThemeToggle";

export default function Header({ apiStatus, modelStatus, health, theme, onToggleTheme }) {
    return (
        <header className="site-header">
            <a className="brand" href="/" aria-label="CorneaAI home">
                <span className="brand-mark"><Activity size={18} /></span>
                <span><strong>CorneaAI</strong><small>AI-Assisted Ocular Analysis</small></span>
            </a>
            <nav className="desktop-nav" aria-label="Primary navigation"><a href="#analysis">ANALYSIS</a><a href="#pipeline">PIPELINE</a><a href="#model">MODEL</a><a href="#about">ABOUT</a></nav>
            <div className="header-tools"><StatusIndicator apiStatus={apiStatus} modelStatus={modelStatus} health={health} /><ThemeToggle theme={theme} onToggle={onToggleTheme} /></div>
        </header>
    );
}
