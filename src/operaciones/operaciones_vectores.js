import { PuntoR3 } from "../clases/clases";

export const convertirAUnitario = ( vec ) => {
    const aux = Math.sqrt( 1. / (vec.x ** 2. + vec.y ** 2. + vec.z ** 2.) );
    let vecUnitario = new PuntoR3(vec.x * aux, vec.y * aux, vec.z * aux);
    return vecUnitario;
}

export const prodConEscalar = ( vec, k ) => {
    let vecRes = new PuntoR3( vec.x * k, vec.y * k, vec.z * k );
    return vecRes;
}

export const prodVectorial = ( vec1, vec2 ) => {
    return new PuntoR3( vec1.y * vec2.z - vec1.z * vec2.y, vec2.x * vec1.z - vec2.z * vec1.x, vec1.x * vec2.y - vec1.y * vec2.x );
}

export const sumaVec = ( vec1, vec2 ) => {
    return new PuntoR3( vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z );
}

export const moduloVector = ( vec ) => {
    return Math.sqrt( vec.x ** 2. + vec.y **2. + vec.z **2. );
} 

export const vectorOpuesto = ( vec ) => {
    return new PuntoR3( -vec.x, -vec.y,  -vec.z );
}