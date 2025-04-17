
export interface Cambio {
  idCambio?: number,
  idSolicitante: number,
  idConcede: number,
  fechaSolicitud: Date,
  fechaTurno1: Date,
  fechaTurno2: Date,
  estado?: string 
}
