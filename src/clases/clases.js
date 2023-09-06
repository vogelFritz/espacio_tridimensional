import { prodConEscalar, sumaVec, convertirAUnitario, prodVectorial } from '../operaciones/operaciones_vectores';

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
}

export class Observador {
    pos;
    dir;
    static angGiro = 0.08819;
    static pasoAvance = 1;
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }

    girarArriba( ) {
        const vecGiro = prodConEscalar(v, this.angGiro);
        obs.dir = sumaVec( obs.dir, vecGiro );
        obs.dir = convertirAUnitario( obs.dir );
        v = prodVectorial( obs.dir, u );
    }
    girarAbajo( ) {
        const vecGiro = prodConEscalar( vectorOpuesto(v), this.angGiro );
        obs.dir = sumaVec( obs.dir, vecGiro );
        obs.dir = convertirAUnitario( obs.dir );
        v = prodVectorial( obs.dir, u );
    }
    girarIzq( ) {
        const vecGiro = prodConEscalar( u, this.angGiro );
        obs.dir = sumaVec( obs.dir, vecGiro );
        obs.dir = convertirAUnitario( obs.dir );
        u = prodVectorial( v, obs.dir );
    }
    girarDer( ) {
        const vecGiro = prodConEscalar( vectorOpuesto(u), this.angGiro );
        obs.dir = sumaVec( obs.dir, vecGiro );
        obs.dir = convertirAUnitario( obs.dir );
        u = prodVectorial( v, obs.dir );
    }
    avanzar( ) {
        const vecAvance = prodConEscalar( obs.dir, this.pasoAvance );
        obs.pos = sumaVec( obs.pos, vecAvance );
    }
    
    retroceder( ) {
        const vecRet = prodConEscalar( obs.dir, -this.pasoAvance );
        obs.pos = sumaVec( obs.pos, vecRet );
    }
    
    moverIzq( ) {
        const vecAvance = prodConEscalar( u, this.pasoAvance );
        obs.pos = sumaVec( obs.pos, vecAvance );
    }
    moverDer( ) {
        const vecAvance = prodConEscalar( u, -this.pasoAvance );
        obs.pos = sumaVec( obs.pos, vecAvance );
    }

}

export class Grafico {
    divHTML;
    constructor() {
      this.divHTML = document.querySelector('.grafico');
    }
}

export class PuntoR2 {
    x;
    y;
    visible = false;
    divHTML;
    constructor( ptoR3 ) {
        const d = -1. * ( obs.dir.x * ptoR3.x + obs.dir.y * ptoR3.y + obs.dir.z * ptoR3.z ),
              lambda = ( -d - obs.dir.x * obs.pos.x - obs.dir.y * obs.pos.y - obs.dir.z * obs.pos.z ) / ( obs.dir.x ** 2. + obs.dir.y ** 2. + obs.dir.z ** 2. );
        const origenR3 = new PuntoR3( obs.pos.x + lambda * obs.dir.x, obs.pos.y + lambda * obs.dir.y, obs.pos.z + lambda * obs.dir.z ),
              dist = Math.sqrt( (origenR3.x - obs.pos.x) ** 2. + (origenR3.y - obs.pos.y) ** 2. + (origenR3.z - obs.pos.z) ** 2. ); 
        let aux = ( u.y * v.x - u.x * v.y );
        if( aux != 0 ) {
            this.y = ( u.y * ( ptoR3.x - origenR3.x ) - u.x * ( ptoR3.y - origenR3.y ) ) / aux;
            this.x = ( v.y * ( ptoR3.x - origenR3.x ) - v.x * ( ptoR3.y - origenR3.y ) ) / (-aux);
        } else {
            aux = ( u.z * v.x - u.x * v.z );
            if( aux != 0 ) {
                this.y = ( u.z * ( ptoR3.x - origenR3.x ) - u.x * ( ptoR3.z - origenR3.z ) ) / aux;
                this.x = ( v.z * ( ptoR3.x - origenR3.x ) - v.x * ( ptoR3.z - origenR3.z ) ) / (-aux);
            } else {
                aux = ( u.z * v.y - u.y * v.z );
                this.y = ( u.z * ( ptoR3.y - origenR3.y ) - u.y * ( ptoR3.z - origenR3.z ) ) / aux;
                this.x = ( v.z * ( ptoR3.y - origenR3.y ) - v.y * ( ptoR3.z - origenR3.z ) ) / (-aux);
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
    divHTML;
    constructor(pto1, pto2) {
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
    divHTML;
    constructor( ver1, ver2, ver3 ) {
        const deltaX = ver2.x - ver1.x,
              deltaY = ver2.y - ver1.y,
              deltaX2 = ver3.x - ver1.x,
              deltaY2 = ver3.y - ver1.y;
        let u = new Punto( deltaX, deltaY ),
            v = new Punto( deltaY, -deltaX ),
            aux1,
            aux2, width = Math.sqrt( deltaX ** 2. + deltaY ** 2. );
        u = convertirAUnitario( u );
        v = convertirAUnitario( v );
        this.ver1 = ver1;
        this.ver2 = ver2;
        this.ver3 = ver3;
        this.divHTML = document.createElement('div');
        this.divHTML.className = 'triangulo';
        this.divHTML.style.top = `${ posGraficoY( ver1.y - 2.5 ) }px`;
        this.divHTML.style.left = `${ posGraficoX( ver1.x + 2.5 ) }px`;
        this.divHTML.style.width = `${ width }px`;
        this.divHTML.style.transform = `rotate(${ Math.atan2( -deltaY, deltaX ) }rad)`; // Ángulo mayor a 90º -> problemas
        aux1 = (deltaY2 * u.x - deltaX2 * u.y) / (v.y * u.x - v.x * u.y);
        this.divHTML.style.height = `${ aux1 }px`; // por ahí conviene agregar valor absoluto
        aux2 = (deltaX2 - aux1 * v.x) / u.x;
        this.divHTML.style.borderLeft = `${ aux2 }px solid transparent`;
        this.divHTML.style.borderRight = `${ width - aux2 }px solid transparent`;
        this.divHTML.style.borderTop = `${ aux1 }px solid blue`;
    }
}
