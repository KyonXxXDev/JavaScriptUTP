import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./components/NavLinks";
import { Link } from "react-router-dom";
import ToggleThemeButton from "../ToggleThemeButton";
import IdeiLogo from "../../icons/IdeiLogo";
const Header = () => {
    // const location = useLocation();
    // ${location.pathname === "/" ? "fixed md:bg-transparent bg-white" : "sticky bg-white shadow-md"}
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`w-full md:h-auto h-auto sticky bg-(--background) shadow-md top-0 z-10`}>
            <div className="max-w-[1650px] mx-auto w-full flex justify-between items-center p-5">

                <Link to={"/"} className="*:hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <IdeiLogo className={`h-8 md:h-10 transition-transform duration-300 cursor-pointer`} />
                </Link>
                <button
                    className="text-(--text) md:hidden focus:outline-none flex justify-end w-full *:hover:scale-115 transition-transform duration-300 cursor-pointer"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X className="transition-all duration-300" size={28} /> : <Menu className="transition-all duration-300" size={28} />}
                </button>
                <nav className="hidden md:flex items-center">
                    <NavLinks className={`flex space-x-8 text-xl font-semibold text-(--text)`} />
                    <ToggleThemeButton />
                </nav>
            </div>

            {/* Menú móvil */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 shadow-2xl bg-white rounded-2xl ease-in-out ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}>
                <NavLinks className={`flex flex-col items-center space-y-4`} />
            </div>
            {/* <Wave className="absolute bottom-0 left-0 w-full h-auto text-white pointer-events-none" /> */}
        </header>
    );
};

export default Header;
