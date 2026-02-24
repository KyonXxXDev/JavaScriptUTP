import { Link } from 'react-router-dom'
import Icon01 from '../../../assets/ic-01.webp'
import Icon02 from '../../../assets/ic-02.webp'
import Icon03 from '../../../assets/ic-03.webp'
import Icon04 from '../../../assets/ic-04.webp'
import Img1 from '../../../assets/LE/IPLE-01-ABS.webp'
import Img2 from '../../../assets/LE/IPLE-01-ON.webp'
import Img3 from '../../../assets/LE/IPLE-01-F.webp'
import Img4 from '../../../assets/LE/IPLE-01-STRUCTURE.webp'
import ImgIple from '../../../assets/iple.webp'
import ImgAbs from '../../../assets/abs.webp'


export default function MainLucesEmergencia() {
    const iconos = [
        { icon: Icon01, label: "Voltaje de alimentación", extra: "220V AC ± 15%; 60Hz" },
        { icon: Icon02, label: "Autonomía de 4 horas", extra: "con dos faros" },
        { icon: Icon03, label: "Faros LED de 18W", extra: "(3600 Lumens)" },
        { icon: Icon04, label: "Fabricado según la Norma Técnica Peruana NTP/IEC 60598-2-22", extra: "" }
    ]
    return (
        <section id="luces-emergencia" className={`flex flex-col gap-20`}>
            <div className={`max-w-full px-4 py-8 flex flex-col md:flex-row gap-8 md:h-[800px]`}>
                <div className="flex gap-4 md:w-1/2 justify-center items-start">
                    <div className="w-full max-w-2xl h-full">
                        <div className="grid grid-cols-2 grid-rows-6 w-full h-[800px] gap-2">
                            <img
                                src={Img4}
                                alt="img1"
                                className="rounded shadow object-cover aspect-[1/3] w-full h-full
                                row-start-1 row-end-3 col-start-1 col-end-2 bg-sky-400"
                            />
                            <img
                                src={Img1}
                                alt="img2"
                                className="rounded shadow object-cover w-full h-full
                                row-start-1 row-end-4 col-start-2 col-end-3 bg-sky-400"
                            />
                            <img
                                src={Img2}
                                alt="img4"
                                className="rounded shadow object-cover w-full h-full
                                row-start-4 row-end-6 col-start-2 col-end-3 bg-sky-400"
                            />
                            <img
                                src={Img3}
                                alt="im3"
                                className="rounded shadow object-cover w-full h-full
                                row-start-3 row-end-6 col-start-1 col-end-2 bg-sky-400"
                            />
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col md:w-1/2 h-full justify-evenly`}>
                    <div className='flex flex-col gap-4'>
                        <h2 className="text-4xl font-semibold text-orange-500 mt-4 mb-2">LUCES DE EMERGENCIA</h2>
                        <p className='text-xl font-sans mx-2 h-[500px]'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                            molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
                            eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                            zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className="text-xl font-semibold text-orange-500 mt-4 mb-2">CARACTERÍSTICAS:</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            {
                                iconos.map((icono) => (
                                    <div key={icono.icon} className="flex flex-col items-center gap-8">
                                        <img className='h-12' src={icono.icon} alt={icono.label} />
                                        <p className="text-sm leading-6">{icono.label}<br />{icono.extra}</p>
                                    </div>
                                ))}
                            {/* <div className="flex flex-col items-center">
                                <span className="text-4xl">⚡</span>
                                <p className="text-sm">Voltaje de alimentación<br />220V AC ± 15%; 60Hz</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl">⏱️</span>
                                <p className="text-sm">Autonomía de 4 horas<br />con dos faros</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl">💡</span>
                                <p className="text-sm">2 Faros LED de 18W<br />(3600 Lumens)</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl">📜</span>
                                <p className="text-sm">Fabricado según la Norma Técnica Peruana NTP/IEC 60598-2-22</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='z-1 flex justify-evenly flex-wrap'>
                <Link to={"iple"} className="h-[500px] w-[400px] hover:scale-105 transition-transform duration-300">
                    <img src={ImgIple} alt="luz emergencia IPLE-01" className='' />
                </Link>
                <Link to={"abs"} className="flex h-[500px] w-[400px] hover:scale-105 transition-transform duration-300 justify-center items-center">
                    <img src={ImgAbs} alt="luz emergencia Hermetica" className='md:h-100 h-105' />
                </Link>
            </div>
        </section>
    )
}