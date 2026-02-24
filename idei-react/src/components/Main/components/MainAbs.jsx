import { useState } from "react"
import MainAbsImage from '../../../assets/abs.webp'
import Thumb1 from '../../../assets/abs-right.webp'
import Thumb2 from '../../../assets/abs-left.webp'
import DimensionesImage from '../../../assets/abs-dim.webp'

export default function MainAbs() {
    const [activeSlide, setActiveSlide] = useState('item-1');
    return (
        <section className="w-full max-w-[90%] mx-auto overflow-hidden space-y-5">

            {/* Header / Título */}
            <header className="w-full font-sans text-orange-500">
                <h2 className="text-4xl font-bold text-start">PRODUCTOS</h2>
                <h3 className="text-3xl font-semibold md:ml-8 text-start">LUCES DE EMERGENCIA</h3>
                <h4 className="text-2xl text-start md:ml-20 mt-2">IPLE 01 - INTERIOR</h4>
            </header>
            <div className='w-full max-w-5xl mx-auto md:h-[500px] h-[300px] flex items-center justify-center px-8 py-4'>
                <div className='md:w-[500px] w-[200px] h-full max-h-[600px] transform-3d flex justify-center items-center'>

                    <input
                        type="radio"
                        name="slider"
                        id="item-1"
                        checked={activeSlide === 'item-1'}
                        onChange={() => setActiveSlide('item-1')}
                        className='hidden'
                    />
                    <input
                        type="radio"
                        name="slider"
                        id="item-2"
                        checked={activeSlide === 'item-2'}
                        onChange={() => setActiveSlide('item-2')}
                        className='hidden'
                    />
                    <input
                        type="radio"
                        name="slider"
                        id="item-3"
                        checked={activeSlide === 'item-3'}
                        onChange={() => setActiveSlide('item-3')}
                        className='hidden'
                    />

                    <div className="cards relative w-full h-full">
                        <label
                            htmlFor="item-1"
                            id='selector-1'
                            className={`card`}
                        >
                            <img src={MainAbsImage} alt="Imagen 1" className="w-full h-full object-contain rounded" />
                        </label>

                        <label
                            htmlFor="item-2"
                            id='selector-2'
                            className={`card`}
                        >
                            <img src={Thumb1} alt="Imagen 2" className="w-full h-full object-contain rounded" />
                        </label>

                        <label
                            htmlFor="item-3"
                            id='selector-3'
                            className={`card`}
                        >
                            <img src={Thumb2} alt="Imagen 3" className="w-full h-full object-contain rounded" />
                        </label>


                    </div>
                </div>
            </div>
            {/* Especificaciones Técnicas */}
            <section className='flex flex-col justify-center items-center'>
                <div className="max-w-5xl w-full overflow-auto">
                    <table className="border border-orange-500 border-collapse font-sans">
                        <tbody>
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th colSpan={4} className="text-4xl tracking-[.3em] p-2 border">
                                        ESPECIFICACIONES TÉCNICAS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ELECTRICIDAD / BATERÍA */}
                                <tr>
                                    <td rowSpan="7" className="bg-white text-black font-bold p-2">ELECTRICIDAD</td>
                                    <td className="p-2">Voltaje de alimentación 220VAC ± 15% 60Hz con línea a tierra</td>
                                    <td rowSpan="7" className="bg-orange-500 text-white font-bold p-2">BATERÍA</td>
                                    <td className="p-2">Batería recargable de Plomo (Pb)</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Inmune a las oscilaciones de la red eléctrica</td>
                                    <td className="p-2">Valor nominal 12V/7Ah</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Cargador Automático</td>
                                    <td className="p-2">Sellada, libre de mantenimiento</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Circuito limitador de carga</td>
                                    <td className="p-2">Autonomía de 4 horas con dos faros</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Tiempo de carga 12 horas máximo</td>
                                    <td className="p-2">Temperatura de trabajo -10°C a 45°C</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Circuito protegido contra humedad</td>
                                    <td className="p-2"></td>
                                </tr>
                                <tr>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                </tr>

                                {/* ILUMINACIÓN / GABINETE */}
                                <tr>
                                    <td rowSpan="7" className="bg-orange-500 text-white font-bold p-2">ILUMINACIÓN</td>
                                    <td className="p-2">2 Faros LED luz fría de 18W (3600 Lúmenes)</td>
                                    <td rowSpan="7" className="bg-white text-black font-bold p-2">GABINETE</td>
                                    <td className="p-2">Polímero ABS Auto extinguible</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Ángulo de iluminación 60°</td>
                                    <td className="p-2">Dimensiones 31 x 24 x 10 cm (incluyendo los faros)</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Temperatura de color 6500K</td>
                                    <td className="p-2"> Agujeros de sujeción para montaje mural (Adosado)</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Faros de aluminio extruido con protección IP-65 (hermético)</td>
                                    <td className="p-2">Asa de transporte</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Tiempo de vida mayor a 60,000 horas</td>
                                    <td className="p-2">Agujeros de sujeción para montaje mural</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Eficiencia mayor a 90%</td>
                                    <td className="p-2">Indicadores LED de presencia de línea y carga de batería</td>
                                </tr>
                                <tr>
                                    <td className="p-2"> Área de iluminación de 150 m2</td>
                                    <td className="p-2"> Pulsador de PRUEBA</td>
                                </tr>

                                {/* IDEIPERU */}
                                <tr>
                                    <td colSpan="4" className="bg-orange-500 text-white font-bold p-2">
                                        IDEIPERU
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="p-2">
                                        Fabricado según la Norma Técnica Peruana NTPIEC 60598-2-22 / 1 año de garantía / Repuestos y Servicio Técnico Especializado (Somos fabricantes)
                                    </td>
                                </tr>
                            </tbody>
                        </tbody>
                    </table>
                    {/* <table >
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th colSpan={2} className="text-4xl font-sans tracking-[.3em] p-2 border">ESPECIFICACIONES TÉCNICAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-top w-1/2 border border-orange-500">
                                        <div className="bg-orange-500 text-white p-2 font-bold">ELECTRICIDAD</div>
                                        <div className="">
                                            <div className="p-2 border-b">Voltaje de alimentación 220VAC ± 15% 60Hz con línea a tierra</div>
                                            <div className="p-2 border-b">Inmune a las oscilaciones de la red eléctrica</div>
                                            <div className="p-2 border-b">Cargador Automático</div>
                                            <div className="p-2 border-b">Circuito limitador de carga</div>
                                            <div className="p-2 border-b">Tiempo de carga 12 horas máximo</div>
                                            <div className="p-2 border-b">Circuito protegido contra humedad</div>
                                            <div className="p-2">Fusible interno de protección</div>
                                        </div>
                                    </td>
                                    <td>
                                        <tr className="bg-orange-500 text-white">
                                            <th colSpan={1} rowSpan={8} className="text-left p-2">ELECTRICIDAD</th>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-2">Voltaje de alimentación 220VAC ± 15% 60Hz con línea a tierra</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-2">Inmune a las oscilaciones de la red eléctrica</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-2">Cargador Automático</td>
                                        </tr>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table> */}
                </div>
            </section>

            {/* Dimensiones */}
            <section className=''>
                <h3 className="text-4xl font-semibold text-orange-500 mb-4">Dimensiones</h3>
                <div className="flex justify-center">
                    <img src={DimensionesImage} alt="Dimensiones IPLE 01" className="max-w-full h-auto rounded shadow" />
                </div>
            </section>
        </section>
    )
}