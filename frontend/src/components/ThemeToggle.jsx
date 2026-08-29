import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle }) {
    return <button className="icon-button" type="button" onClick={onToggle} aria-label="Toggle theme" title="Toggle theme">{theme === "light" ? <Moon size={17} /> : <Sun size={17} />}</button>;
}
