import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  httpClient = inject(HttpClient);
  private baseUrl : string = 'http://localhost:8085/empleados';


  constructor() {

  function validarEdadMinima(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const fechaNacimiento = control.get('fechaNacimiento')?.value;
        const fechaIngreso = control.get('fechaIngreso')?.value;
    
        if (!fechaNacimiento || !fechaIngreso) {
          return null; // Esperar a que ambos campos estén completos
        }
    
        const edad = calcularEdad(new Date(fechaNacimiento), new Date(fechaIngreso));
        return edad >= 18 ? null : { edadInvalida: true };
      };
    }
    
    function calcularEdad(fechaNacimiento: Date, fechaIngreso: Date): number {
      let edad = fechaIngreso.getFullYear() - fechaNacimiento.getFullYear();
      const mes = fechaIngreso.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && fechaIngreso.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad;
    }
  }  

  getAllWithPromises(): Promise<any> {
    return lastValueFrom(this.httpClient.get<{ results: Empleado[] }>(this.baseUrl));
  }

  getById(idEmp: number): Promise<Empleado> {
    return lastValueFrom(this.httpClient.get<Empleado>(`${this.baseUrl}/${idEmp}`));
  }
  
  delete(idEmp: number): Promise<Empleado> {
    return lastValueFrom(this.httpClient.delete<Empleado>(`${this.baseUrl}/${idEmp}`));
  }

  insert(empleado: Empleado): Promise<Empleado>{
    return lastValueFrom(this.httpClient.post<Empleado>(this.baseUrl, empleado));
  }

  update(idEmp: number, empleado: Empleado): Promise<Empleado> {
    console.log(empleado);
    return lastValueFrom(this.httpClient.put<Empleado>(`${this.baseUrl}/${idEmp}`, empleado));
  }

  //para sacar empleados de cada grupo, implementado en el back, aun no en el front
  getByGrupo(idGrupo: number): Promise<Empleado[]> {
    return lastValueFrom(this.httpClient.get<Empleado[]>(`${this.baseUrl}/grupo/${idGrupo}`));
  }

  //para modificar el estado del empleado
  updateEstado(idEmp: number): Promise<Empleado> {
    return lastValueFrom(this.httpClient.put<Empleado>(`${this.baseUrl}/${idEmp}/estado`, {}));
  }



}
