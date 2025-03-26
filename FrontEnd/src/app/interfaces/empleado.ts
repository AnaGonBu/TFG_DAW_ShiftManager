import { Grupo } from "./grupo"

export interface Empleado {
  idEmp: number,
  nombre: string,
  apellidos: string,
  email: string,
  imagen: string,
  domicilio: string,
  fechaIngreso: Date,
  fechaNacimiento: Date,
  situacion: string,
  estado: boolean,
  grupo: Grupo
  //grupo: number
}
