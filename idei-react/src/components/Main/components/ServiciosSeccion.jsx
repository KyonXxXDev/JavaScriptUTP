import servicio1 from '../../../assets/s-inst-prod.webp';
import servicio2 from '../../../assets/s-manten-le.webp';
import servicio3 from '../../../assets/s-proyectos.webp';
import servicio4 from '../../../assets/s-inspeccion-itse.webp';
import FadeInSection from '../../FadeInSection';

const servicios = [
    { img: servicio1, alt: 'Instalación de productos' },
    { img: servicio2, alt: 'Mantenimiento de luces de emergencia' },
    { img: servicio3, alt: 'Proyectos de implementación' },
    { img: servicio4, alt: 'Inspecciones ITSE' },
];

const ServiciosSeccion = () => {
    return (
        <FadeInSection>
            <section id="servicios" className="max-w-6xl mx-auto p-4 flex flex-col overflow-hidden">
                <h2 className="p-2 text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-b from-orange-400 to-orange-700 bg-clip-text text-transparent">
                    Servicios
                </h2>
                <div className="m-6 text-center font-sans">
                    <p>
                        Diseño, fabricación e implementación sin puntos débiles. En IDEI PERU, entendemos la importancia crítica de la seguridad en locales comerciales e industriales, donde las inspecciones ITSE son fundamentales para obtener la categría de funcionamiento.
                    </p>
                    <p>
                        Nuestro compromiso es brindar soluciones de seguridad confiables y personalizadas que garanticen el cumplimiento de los estándares y normativas, permitiendo a nuestros clientes operar de manera segura y eficiente, sin interrupciones ni riesgos para sus empleados y operaciones.
                    </p>
                </div>
                <div className='flex flex-wrap gap-6 justify-center'>
                    {servicios.map((Servicio) => (
                        <div 
                            key={Servicio.img}
                            className='flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
                        >
                            <img
                                src={Servicio.img} 
                                loading='lazy'
                                alt={Servicio.alt} 
                                className="object-contain w-64" 
                            />
                        </div>
                    ))}
                </div>
            </section>
        </FadeInSection>
    );
};

export default ServiciosSeccion;