import VideoHero from './VideoHero'
import Bienvenida from './Bienvenida'
import ProductosSeccion from './ProductosSeccion'
import ServiciosSeccion from './ServiciosSeccion'
import CarruselSeccion from './CarruselSeccion'

export default function MainPage(){
    return(
        <>
            <VideoHero />
            <Bienvenida />
            <ProductosSeccion />
            <ServiciosSeccion />
            <CarruselSeccion id="clientes" titulo="CLIENTES QUE CONFIAN EN NOSOTROS" />
        </>
    )
}