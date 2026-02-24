import SocialIcon from './components/SocialIcon';
import Wave from '../../icons/Wave'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer id="contactanos" className="bg-gradient-to-b from-orange-400 to-orange-700 text-white font-sans">
            <Wave className="text-(--background) w-full h-auto rotate-180"/>
            
            <div className="max-w-dvw mx-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Columna izquierda */}
                <div className="max-w-2xl flex flex-col justify-between space-y-6">
                    <div>
                        <h3 className="font-bold mb-2">NUESTROS PRODUCTOS</h3>
                        <ul className="flex flex-col w-fit pace-y-1 text-sm">
                            <Link
                                to="/luces"
                                className="relative inline-block px-2 py-1 text-white
                                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                                after:bg-gradient-to-b after:from-white after:to-white
                                after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Luces de emergencia
                            </Link>
                            <Link
                                to="/extintores"
                                className="relative inline-block px-2 py-1 text-white
                                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                                after:bg-gradient-to-b after:from-white after:to-white
                                after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Extintores
                            </Link>
                            <Link
                                to="/señales"
                                className="relative inline-block px-2 py-1 text-white
                                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                                after:bg-gradient-to-b after:from-white after:to-white
                                after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Señaléticas
                            </Link>
                        </ul>
                        <div className="mt-4">
                            <SocialIcon/>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">UBÍCANOS</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.274981293814!2d-76.92786072493921!3d-12.024580488210521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c57e752e1f9b%3A0xad838d52d01148ab!2sIDEIPERU!5e0!3m2!1ses-419!2spe!4v1748652813299!5m2!1ses-419!2spe"
                            height="170"
                            className="rounded w-full"
                            allowFullScreen=""
                            loading="lazy"
                            title="Ubicación de IdeiPeru en Google Maps"
                        ></iframe>
                    </div>
                </div>

                {/* Columna derecha: formulario */}
                <div className="flex flex-col justify-between">
                    <h3 className="font-bold mb-4 text-center">NUESTROS SERVICIOS</h3>
                    <form className="flex flex-col space-y-3">
                        <input
                            type="text"
                            placeholder="Nombres y Apellidos"
                            className="p-2 rounded border border-orange-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition"
                        />
                        <input
                            type="email"
                            placeholder="Correo"
                            className="p-2 rounded border border-orange-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition"
                        />
                        <textarea
                            placeholder="Descripción"
                            className="h-40 p-3 rounded border border-orange-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="border-t border-white/70 mt-6 py-4 text-xs font-mono text-center">
                © IdeiPeru 2025
            </div>
        </footer>
    );
};

export default Footer;