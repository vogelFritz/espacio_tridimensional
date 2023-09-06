import { PuntoR3, PuntoR2, Espacio, Observador, Grafico, } from './src/clases/clases';
import { convertirAUnitario, prodConEscalar, prodVectorial, sumaVec, moduloVector, vectorOpuesto } from './src/operaciones/operaciones_vectores'

const grafico = new Grafico();
let espacio = new Espacio(),
    obs = new Observador( new PuntoR3( 0, 0, 20 ), new PuntoR3( 0, 0, -1 ), new PuntoR3( 1, 0, 0 ), new PuntoR3( 0, 1, 0 ) );

espacio.agregarPunto( new PuntoR3( 0, 0, 0 ) );

grafico.render( espacio, obs );