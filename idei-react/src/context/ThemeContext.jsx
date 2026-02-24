import { createContext } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const value = 0;
    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}