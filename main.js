import { PuntoR3, PuntoR2, Espacio, Observador, Grafico, Triangulo } from './src/clases/clases';
import { convertirAUnitario, prodConEscalar, prodVectorial, sumaVec, moduloVector, vectorOpuesto } from './src/operaciones/operaciones_vectores'

const grafico = new Grafico();
let espacio = new Espacio(),
    obs = new Observador( new PuntoR3( 0, 0, 50 ), new PuntoR3( 0, 0, -1 ), new PuntoR3( 1, 0, 0 ), new PuntoR3( 0, 1, 0 ) );

espacio.agregarPunto( new PuntoR3( 0, 0, 0 ) );
espacio.agregarPunto( new PuntoR3( 20, 20, 0 ) );
espacio.agregarPunto( new PuntoR3( 20, -20, 0 ) );
espacio.agregarPunto( new PuntoR3( 40, 0, 0 ) );
espacio.agregarTriangulo( new PuntoR3( 20, 20, 0 ), new PuntoR3( 20, -20, 0 ), new PuntoR3( 40, 0, 0 ) );

grafico.render( espacio, obs );

grafico.divHTML.addEventListener("keydown", (e) => {
    switch(e.key) {
        case 'ArrowUp': obs.girarArriba();
            break;
        case 'ArrowDown': obs.girarAbajo();
            break;
        case 'ArrowLeft': obs.girarIzq();
            break;
        case 'ArrowRight': obs.girarDer();
            break;
        case 'w': ;
        case 'W': obs.avanzar();
            break;
        case 's': ;
        case 'S': obs.retroceder();
            break;
        case 'a': ;
        case 'A': obs.moverIzq();
            break;
        case 'd': ;
        case 'D': obs.moverDer();
            break;
    }
    grafico.render( espacio, obs );
});