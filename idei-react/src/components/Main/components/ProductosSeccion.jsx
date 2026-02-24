import img1 from '../../../assets/p-lemergencia.webp';
import img2 from '../../../assets/p-señales.webp';
import img3 from '../../../assets/p-extintores.webp';
import FadeInSection from '../../FadeInSection';
import { Link } from 'react-router-dom';

const productos = [
    { img: img1, alt: 'Luz de emergencia', to: "/luces" },
    { img: img2, alt: 'Señaléticas', to: "/señales" },
    { img: img3, alt: 'Extintores', to: "/extintores"}
];

const ProductosSeccion = () => {
    return (
        <FadeInSection>
            <section id="productos" className="flex flex-col mx-auto max-w-6xl p-4 overflow-hidden">
                <h2 className="p-2 text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-b from-orange-400 to-orange-700 bg-clip-text text-transparent">
                    PRODUCTOS
                </h2>
                <div className="m-6 text-center font-sans">
                    <p>Producto diseñado para entornos exigentes. Fabricamos e implementamos luces de emergencia de alta potencia y señaléticas a medida para centros comerciales, zonas industriales y espacios comerciales de gran tamaño. Nuestros productos están diseñados para garantizar la seguridad y visibilidad en espacios críticos, cumpliendo con los más altos estándares de calidad y normativa.</p>
                </div>
                <div className='flex flex-wrap gap-6 justify-center mx-auto max-w-6xl p-4'>
                    {productos.map((producto) => (
                        <Link
                            to={producto.to}
                            key={producto.img}
                            className='flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
                        >
                            <img 
                                src={producto.img}
                                loading='lazy'
                                alt={producto.alt} 
                                className="object-contain w-64" 
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </FadeInSection>
    );
};

export default ProductosSeccion;