import { Link } from "react-router-dom";

export default function NavLinks({ onClick, className }) {
    const links = [
        { href: "/#inicio", label: "Inicio" },
        { href: "/#productos", label: "Productos" },
        { href: "/#servicios", label: "Servicios" },
        { href: "/#contactanos", label: "Contáctanos" },
    ];
    return (
        <ul className={`${className} flex text-2xl font-extrabold`}>

            {/* Otros links */}
            {links.map((link) => (
                <li key={link.href}>
                    <a
                        onClick={onClick}
                        href={link.href}
                        className="relative inline-block px-2 py-1 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-700 bg-clip-text text-transparent
                        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                        after:bg-gradient-to-b after:from-orange-400 after:to-orange-700
                        after:transition-all after:duration-300 hover:after:w-full"
                    >
                        {link.label}
                    </a>
                </li>
            ))}

            {/* Nosotros */}
            <li>
                <Link
                    to="/nosotros"
                    className="relative inline-block px-2 py-1 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-700 bg-clip-text text-transparent
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                    after:bg-gradient-to-b after:from-orange-400 after:to-orange-700
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                    Nosotros
                </Link>
            </li>
        </ul>
    )
}