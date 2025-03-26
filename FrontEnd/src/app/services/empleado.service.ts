import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  httpClient = inject(HttpClient);
  private baseUrl : string = 'http://localhost:8085/empleados';


  constructor() {}  

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

 /**  update(idEmp: number, empleado: Empleado): Promise<Empleado> {
    return lastValueFrom(this.httpClient.put<Empleado>(this.baseUrl + "/" +empleado.idEmp, empleado));
  }*/

  update(idEmp: number, empleado: Empleado): Promise<Empleado> {
    console.log(empleado);
    return lastValueFrom(this.httpClient.put<Empleado>(`${this.baseUrl}/${idEmp}`, empleado));
  }

}
