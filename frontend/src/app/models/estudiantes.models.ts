export interface Estudiante {

    id: string,
    codigo: string,
    nombres: string,
    apellidos: string,
    programaId: string,
    foto: string
}

export interface Pago {

    id: number,
    fecha: string,
    cantidad: number,
    type: string,
    status: string,
    file: string,
    estudiante: Estudiante
}

export enum PaymentType {
    EFECTIVO = 0, CHEQUE = 1, PSE = 2, DEPOSITO = 3
}

export enum PaymentStatus {
    CREADO = 0, VALIDADO = 1, RECHAZADO = 2
}