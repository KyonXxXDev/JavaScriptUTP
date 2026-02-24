import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react"

export default function ToggleThemeButton(){
    const [theme, setTheme] = useState(localStorage.getItem("theme")|| 'light');

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = theme;
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle-mode"
            className={`text-(--text) ml-4 p-2 rounded-full *:hover:scale-105 transition-transform duration-300 cursor-pointer hover:bg-(--hover) `}
        >
            {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    )
}