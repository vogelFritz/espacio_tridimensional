import { prodConEscalar, sumaVec, convertirAUnitario, prodVectorial, vectorOpuesto } from '../operaciones/operaciones_vectores';

const grafico = document.querySelector('.grafico');
const posGraficoX = ( x ) => grafico.offsetWidth / 2. + x;
const posGraficoY = ( y ) => grafico.offsetHeight / 2. - y;

export class PuntoR3 {
    x;
    y;
    z;
    constructor( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Espacio {
    puntos = [];
    triangulos = [];
    lineas = [];
    
    agregarPunto( ptoR3 ) {
        this.puntos.push( ptoR3 );
    }

    agregarTriangulo( pto1, pto2, pto3 ) {
        let puntos = [];
        puntos.push( pto1, pto2, pto3 );
        this.triangulos.push(puntos);
    }

    agregarLinea( pto1, pto2 ) {
        let puntos = [];
        puntos.push( pto1, pto2 );
        this.lineas.push( puntos );
    }

}

export class Observador {
    pos;
    dir;
    u;
    v;
    angGiro = 0.08819; // static generaba errores (cuidado al usar propiedades static adentro de funciones)
    pasoAvance = 1;
    constructor(pos, dir, u, v) {
        this.pos = pos;
        this.dir = dir;
        this.u = u; 
        this.v = v;
    }

    girarArriba( angulo ) {
        const vecGiro = prodConEscalar(this.v, this.angGiro * (-angulo) );
        this.dir = sumaVec( this.dir, vecGiro );
        this.dir = convertirAUnitario( this.dir );
        this.v = prodVectorial( this.dir, this.u );
    }
    girarAbajo( angulo ) {
        const vecGiro = prodConEscalar( vectorOpuesto(this.v), this.angGiro * angulo );
        this.dir = sumaVec( this.dir, vecGiro );
        this.dir = convertirAUnitario( this.dir );
        this.v = prodVectorial( this.dir, this.u );
    }
    girarIzq( angulo ) {
        const vecGiro = prodConEscalar( this.u, this.angGiro * angulo );
        this.dir = sumaVec( this.dir, vecGiro );
        this.dir = convertirAUnitario( this.dir );
        this.u = prodVectorial( this.v, this.dir );
    }
    girarDer( angulo ) {
        const vecGiro = prodConEscalar( vectorOpuesto(this.u), this.angGiro * -angulo );
        this.dir = sumaVec( this.dir, vecGiro );
        this.dir = convertirAUnitario( this.dir );
        this.u = prodVectorial( this.v, this.dir );
    }
    avanzar( ) {
        const vecAvance = prodConEscalar( this.dir, this.pasoAvance );
        this.pos = sumaVec( this.pos, vecAvance );
    }
    
    retroceder( ) {
        const vecRet = prodConEscalar( this.dir, -this.pasoAvance );
        this.pos = sumaVec( this.pos, vecRet );
    }
    
    moverIzq( ) {
        const vecAvance = prodConEscalar( this.u, -this.pasoAvance );
        this.pos = sumaVec( this.pos, vecAvance );
    }
    moverDer( ) {
        const vecAvance = prodConEscalar( this.u, this.pasoAvance );
        this.pos = sumaVec( this.pos, vecAvance );
    }

}

export class PuntoR2 {
    x;
    y;
    ptoR3;
    visible = false;
    divHTML;
    constructor( ptoR3, obs ) {
        this.ptoR3 = ptoR3;
        const d = -1. * ( obs.dir.x * ptoR3.x + obs.dir.y * ptoR3.y + obs.dir.z * ptoR3.z ),
              lambda = ( -d - obs.dir.x * obs.pos.x - obs.dir.y * obs.pos.y - obs.dir.z * obs.pos.z ) / ( obs.dir.x ** 2. + obs.dir.y ** 2. + obs.dir.z ** 2. );
        const origenR3 = new PuntoR3( obs.pos.x + lambda * obs.dir.x, obs.pos.y + lambda * obs.dir.y, obs.pos.z + lambda * obs.dir.z ),
              dist = Math.sqrt( (origenR3.x - obs.pos.x) ** 2. + (origenR3.y - obs.pos.y) ** 2. + (origenR3.z - obs.pos.z) ** 2. ); 
        let aux = ( obs.u.y * obs.v.x - obs.u.x * obs.v.y );
        if( aux != 0 ) {
            this.y = ( obs.u.y * ( ptoR3.x - origenR3.x ) - obs.u.x * ( ptoR3.y - origenR3.y ) ) / aux;
            this.x = ( obs.v.y * ( ptoR3.x - origenR3.x ) - obs.v.x * ( ptoR3.y - origenR3.y ) ) / (-aux);
        } else {
            aux = ( obs.u.z * obs.v.x - obs.u.x * obs.v.z );
            if( aux != 0 ) {
                this.y = ( obs.u.z * ( ptoR3.x - origenR3.x ) - obs.u.x * ( ptoR3.z - origenR3.z ) ) / aux;
                this.x = ( obs.v.z * ( ptoR3.x - origenR3.x ) - obs.v.x * ( ptoR3.z - origenR3.z ) ) / (-aux);
            } else {
                aux = ( obs.u.z * obs.v.y - obs.u.y * obs.v.z );
                this.y = ( obs.u.z * ( ptoR3.y - origenR3.y ) - obs.u.y * ( ptoR3.z - origenR3.z ) ) / aux;
                this.x = ( obs.v.z * ( ptoR3.y - origenR3.y ) - obs.v.y * ( ptoR3.z - origenR3.z ) ) / (-aux);
            }
        }
        this.x = (this.x / dist) * grafico.offsetHeight;
        this.y = (this.y / dist) * grafico.offsetHeight;
        this.divHTML = document.createElement('div');
        this.divHTML.className = 'punto';
        this.divHTML.style.top = `${ posGraficoY(this.y) }px`; 
        this.divHTML.style.left = `${ posGraficoX(this.x) }px`;
        if( lambda > 0 ) {
            this.visible = true;
        }
    }
}

export class LineaR2 {
    pto1;
    pto2;
    puntos = [];
    divHTML;
    constructor(pto1, pto2) {
        this.puntos.push( pto1.ptoR3, pto2.ptoR3 );
        const aux1 = posGraficoY( pto1.y ),
              aux2 = posGraficoX( pto1.x ),
              aux3 = posGraficoY( pto2.y ),
              aux4 = posGraficoX( pto2.x );
        const deltaX = aux4 - aux2, 
              deltaY = aux3 - aux1;
        this.pto1 = pto1;
        this.pto2 = pto2;
        this.divHTML = document.createElement('div');
        this.divHTML.className = 'linea';
        this.divHTML.style.top = `${ aux1 }px`;
        this.divHTML.style.left = `${ aux2 + 2.5 }px`;
        this.divHTML.style.width = `${ Math.sqrt( deltaX ** 2. + deltaY ** 2. ) }px`;
        this.divHTML.style.transform = `rotate(${ Math.atan2( deltaY, deltaX ) }rad)`;
    }
}

export class Triangulo {
    ver1;
    ver2;
    ver3;
    puntos = []
    visible = false;
    divHTML;
    constructor( ver1, ver2, ver3) {
        this.puntos.push( ver1.ptoR3, ver2.ptoR3, ver3.ptoR3 );
        const deltaX = ver2.x - ver1.x,
              deltaY = ver2.y - ver1.y,
              deltaX2 = ver3.x - ver1.x,
              deltaY2 = ver3.y - ver1.y;
        let u = new PuntoR3( deltaX, deltaY, 0 ),
            v = new PuntoR3( deltaY, -deltaX, 0 ),
            aux1,
            aux2, width = Math.sqrt( deltaX ** 2. + deltaY ** 2. );
        u = convertirAUnitario( u );
        v = convertirAUnitario( v );
        this.ver1 = ver1;
        this.ver2 = ver2;
        this.ver3 = ver3;
        this.divHTML = document.createElement('div');
        this.divHTML.className = 'triangulo';
        this.divHTML.style.width = `${ width }px`;
        aux1 = (deltaY2 * u.x - deltaX2 * u.y) / (v.y * u.x - v.x * u.y);
        if(u.x != 0)
            aux2 = (deltaX2 - aux1 * v.x) / u.x;
        else
            aux2 = (deltaY2 - aux1 * v.y) / u.y;
        if(aux1 > 0) {
            this.divHTML.style.top = `${ posGraficoY( ver1.y - 2.5 ) }px`;
            this.divHTML.style.left = `${ posGraficoX( ver1.x + 2.5 ) }px`;
            this.divHTML.style.transform = `rotate(${ Math.atan2( -deltaY, deltaX ) }rad)`; // Ángulo mayor a 90º -> problemas
            this.divHTML.style.borderLeft = `${ Math.abs(aux2) }px solid transparent`;
            this.divHTML.style.borderRight = `${ width - Math.abs(aux2) }px solid transparent`;
        }
        else {
            this.divHTML.style.top = `${ posGraficoY( ver2.y - 2.5 ) }px`;
            this.divHTML.style.left = `${ posGraficoX( ver2.x + 2.5 ) }px`;
            this.divHTML.style.transform = `rotate(${ Math.atan2( -deltaY, deltaX ) + Math.PI }rad)`;
            this.divHTML.style.borderRight = `${ Math.abs(aux2) }px solid transparent`;
            this.divHTML.style.borderLeft = `${ width - Math.abs(aux2) }px solid transparent`;
        }
        this.divHTML.style.height = `${ Math.abs(aux1) }px`; // por ahí conviene agregar valor absoluto
        this.divHTML.style.borderTop = `${ Math.abs(aux1) }px solid blue`;
        if(ver1.visible || ver2.visible || ver3.visible)
            this.visible = true;
    }
}

export class Grafico {
    divHTML;
    constructor() {
      this.divHTML = document.querySelector('.grafico');
    }

    render( espacio, obs ) {
        this.divHTML.replaceChildren('');
        espacio.puntos.forEach( elem => {
            const ptoR2 = new PuntoR2( elem, obs )
            if(ptoR2.visible)
                this.divHTML.append( ptoR2.divHTML );
        });
    
        espacio.triangulos.forEach( elem => {
            const triangulo = new Triangulo( new PuntoR2(elem[0], obs), new PuntoR2(elem[1], obs), new PuntoR2(elem[2], obs) );
            if(triangulo.visible)
                this.divHTML.append( triangulo.divHTML );
        });
    
        espacio.lineas.forEach( elem => {
            const linea = new LineaR2( new PuntoR2( elem[0], obs ), new PuntoR2( elem[1] ), obs );
            this.divHTML.append( linea.divHTML );
        });
    
    }
}
