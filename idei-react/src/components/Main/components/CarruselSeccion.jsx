import logo1 from '../../../assets/logo-oslo.webp';
import logo2 from '../../../assets/logo-vivanda.webp';
import logo3 from '../../../assets/logo-plazavea.webp';
import logo4 from '../../../assets/logo-metro.webp';
import logo5 from '../../../assets/logo-makro.webp';
import FadeInSection from '../../FadeInSection';

export default function CarruselSeccion({id, titulo}){
    const imagenes = [
        { id: 'img1', src: logo1 },
        { id: 'img2', src: logo2 },
        { id: 'img3', src: logo3 },
        { id: 'img4', src: logo4 },
        { id: 'img5', src: logo5 }
    ]
    return (
        <FadeInSection>
            <section id={id} className='w-full p-4 flex flex-col justify-center items-center overflow-hidden'>
                <h2 className="p-2 text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-b from-orange-400 to-orange-700 bg-clip-text text-transparent">{titulo}</h2>
                <div className="max-w-6xl m-6 text-center font-sans">
                    <p>
                        Nuestra mejor credencial: quienes nos eligen. Cada cliente representa un deasafío único que asumimos con dedicación. Estas alianzas nos inspiran a mejorar continuamente y ofrecer soluciones a la altura de los entornos más exigentes.
                    </p>
                </div>
                <div className="img_slider flex relative overflow-hidden">
                    <div
                        className="relative flex w-[calc(300px*6)] h-[240px] p-10"
                    >
                        {imagenes.map((src, index) => (
                            <div
                                className="item absolute left-full"
                                key={src.id}
                                style={{ "--position": index + 1 }}
                            >
                                <div className="flex justify-center items-center">
                                    <img
                                        className="object-contain"
                                        src={src.src}
                                        alt={`Imagen ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FadeInSection>
    );
}