import { PuntoR3, PuntoR2, Espacio, Observador, Grafico, Triangulo } from './src/clases/clases';
import { convertirAUnitario, prodConEscalar, prodVectorial, sumaVec, moduloVector, vectorOpuesto } from './src/operaciones/operaciones_vectores'

const grafico = new Grafico();
let espacio = new Espacio(),
    obs = new Observador( new PuntoR3( 0, 0, 50 ), new PuntoR3( 0, 0, -1 ), new PuntoR3( 1, 0, 0 ), new PuntoR3( 0, 1, 0 ) ),
    movStates = [];
for(let i = 0; i < 8; i++)
    movStates.push(false);

espacio.agregarPunto( new PuntoR3( 0, 0, 0 ) );
espacio.agregarPunto( new PuntoR3( 20, 20, 0 ) );
espacio.agregarPunto( new PuntoR3( 20, -20, 0 ) );
espacio.agregarPunto( new PuntoR3( 40, 0, 0 ) );
espacio.agregarTriangulo( new PuntoR3( 20, 20, 0 ), new PuntoR3( 20, -20, 0 ), new PuntoR3( 40, 0, 0 ) );
// espacio.agregarTriangulo( new PuntoR3( 20, 20, 0 ), new PuntoR3( 20, -20, 0 ), new PuntoR3( 20, 0, 20 ) );
// espacio.agregarTriangulo( new PuntoR3( 20, 20, 0 ), new PuntoR3( 40, 0, 0 ), new PuntoR3( 20, 0, 20 ) );
// espacio.agregarTriangulo( new PuntoR3( 20, -20, 0 ), new PuntoR3( 40, 0, 0 ), new PuntoR3( 20, 0, 20 ) );

grafico.render( espacio, obs );

grafico.divHTML.addEventListener("keydown", (e) => {
    switch(e.key) {
        case 'ArrowUp': movStates[0] = true;
            break;
        case 'ArrowDown': movStates[1] = true;
            break;
        case 'ArrowLeft': movStates[2] = true;
            break;
        case 'ArrowRight': movStates[3] = true;
            break;
        case 'w': ;
        case 'W': movStates[4] = true;
            break;
        case 's': ;
        case 'S': movStates[5] = true;
            break;
        case 'a': ;
        case 'A': movStates[6] = true;
            break;
        case 'd': ;
        case 'D': movStates[7] = true;
        default: break;
    }
});

grafico.divHTML.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowUp': movStates[0] = false;
            break;
        case 'ArrowDown': movStates[1] = false;
            break;
        case 'ArrowLeft': movStates[2] = false;
            break;
        case 'ArrowRight': movStates[3] = false;
            break;
        case 'w': ;
        case 'W': movStates[4] = false;
            break;
        case 's': ;
        case 'S': movStates[5] = false;
            break;
        case 'a': ;
        case 'A': movStates[6] = false;
            break;
        case 'd': ;
        case 'D': movStates[7] = false;
        default: break;
    }
});

const gameLoop = () => {
    const aux = 0.5;
    if(movStates[0]){
        obs.girarArriba(-aux);
        grafico.render( espacio, obs );
    }
    if(movStates[1]){
        obs.girarAbajo(aux);
        grafico.render( espacio, obs );
    }
    if(movStates[2]){
        obs.girarIzq(-aux);
        grafico.render( espacio, obs );
    }
    if(movStates[3]){
        obs.girarDer(aux);
        grafico.render( espacio, obs );
    }
    if(movStates[4]){
        obs.avanzar(-aux);
        grafico.render( espacio, obs );
    }
    if(movStates[5]){
        obs.retroceder(-aux);
        grafico.render( espacio, obs );
    }
    if(movStates[6]){
        obs.moverIzq(-aux);
        grafico.render( espacio, obs );
    }
    if(movStates[7]){
        obs.moverDer(-aux);
        grafico.render( espacio, obs );
    }
    setTimeout(gameLoop, 10);
}

gameLoop();