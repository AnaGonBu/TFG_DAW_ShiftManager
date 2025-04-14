import { Empleado } from "./empleado"

export interface Cambio {
  idCambio: number,
  solicitante: Empleado,
  idConcede: number,
  fechaSolicitud: Date,
  fechaTurno1: Date,
  fechaTurno2: Date
}
