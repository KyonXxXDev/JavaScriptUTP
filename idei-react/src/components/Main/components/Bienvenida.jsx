import FadeInSection from '../../FadeInSection';

function Bienvenida(){
    return(
        <FadeInSection>
            <section id="inicio" className="flex flex-col mx-auto max-w-6xl p-4 overflow-hidden">
                <h2 className="p-2 text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-b from-orange-400 to-orange-700 bg-clip-text text-transparent">BIENVENIDOS A IDEI PERÚ</h2>
                <div className="m-6 text-center font-sans">
                    <p>Soporte continuo para instalaciones que no pueden parar.</p>
                    <p>Más que un proveedor, en IDEI PERU - Seguridad Industrial y Comercial; somos tu respaldo constante.</p>
                    <p>Nuestro equipo está disponible cuando lo necesitas, con atención cercana, soporte técnico continuo y capacidad de respuesta inmediata.</p>
                    <p>Porque en seguridad, no hay margen para esperar.</p>
                </div>
            </section>
        </FadeInSection>
    )
};
export default Bienvenida;