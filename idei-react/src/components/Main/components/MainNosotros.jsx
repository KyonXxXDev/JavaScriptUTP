import imgIdei from '../../../assets/idei.webp';
import security from '../../../assets/security.webp';
import signal from '../../../assets/signal.webp';

export default function MainNosotros() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <img src={imgIdei} alt="trabajadores de IDEI" />
            <h2 className='text-6xl tracking-widest text-orange-400'>NOSOTROS</h2>
            <div className='space-y-10 m-10'>

                <div className='text-center mb-20'>
                    <p className='font-sans'>"Bienvenidos a IDEIPERÚ, expertos en soluciones de seguridad y protección</p>
                    <p className='font-sans'>para empresas líderes en centros comerciales, zonas industriales y espacios de gran envergadura.</p>
                    <p className='font-sans'>Nuestros productos y servicios están diseñados para satisfacer las necesidades específicas</p>
                    <p className='font-sans'>de las organizaciones que requieren soluciones de seguridad confiables y efectivas."</p>
                </div>

                <div className='max-w-5xl w-full flex flex-col md:flex-row items-center gap-8'>
                    <div className='flex-1 space-y-12 leading-relaxed '>
                        <h3 className='text-5xl md:text-start text-center text-orange-400 font-bold'>Comprometidos con</h3>
                        <p className='md:ml-10 md:w-[500px] font-sans text-justify'>Brindar soluciones tecnológicas personalizadas para todos nuestros clientes, haciendo uso de energías renovables que minimicen el impacto ambiental, dando soporte continuo y real a todos nuestros productos y servicios.</p>
                    </div>
                    <img src={security} alt="" className='h-[400px] w-[300px] object-cover rounded shadow-xl' />
                </div>

                <div className='max-w-5xl w-full flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:hidden flex-1 space-y-12 leading-relaxed'>
                        <h3 className='text-5xl md:text-start text-center text-orange-400 font-bold'>VISIÓN</h3>
                        <p className='md:ml-10 md:w-[500px]'>  "Ser reconocidos como la empresa referente
                            en  desarrollo de soluciones tecnológicas personalizadas
                            en el Perú, destacando por
                            nuestra innovación, calidad y
                            aporte al crecimiento
                            de la industria y minería."</p>
                    </div>

                    <img src={signal} alt="" className='h-[400px] w-[300px] object-cover rounded shadow-xl' />

                    <div className='hidden md:block flex-1 space-y-12 leading-relaxed'>
                        <h3 className='text-5xl md:text-start text-center text-orange-400 font-bold'>Nuestro horizonte</h3>
                        <p className='md:ml-10 md:w-[500px] font-sans text-justify'>  
                            Ser reconocidos como la empresa referente en desarrollo de soluciones tecnológicas personalizadas en el Perú, destacando por nuestra innovación, calidad y aporte al crecimiento de la industria y minería.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}