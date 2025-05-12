import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { Grupo } from '../interfaces/grupo';

export interface GruposConEmpleadosResponse {
  [idGrupo: string]: Empleado[];
}

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  
  httpClient = inject(HttpClient);
  private baseUrl : string = 'http://localhost:8085/grupos';

  constructor() { }

  getAllWithPromises(): Promise<Grupo[]> {
      return lastValueFrom(this.httpClient.get< Grupo[] >(this.baseUrl));
    }
    
  actualizarTurnos(gruposActualizados: Partial<Grupo>[]): Promise<any> {
    const url = `${this.baseUrl}/all`;
    return lastValueFrom(this.httpClient.put(url, gruposActualizados));
    }
    getGruposConMiembrosParaFecha(fecha: string): Promise<GruposConEmpleadosResponse> { // Recibe string YYYY-MM-DD
      const params = new HttpParams().set('fecha', fecha);
      return new Promise<GruposConEmpleadosResponse>((resolve, reject) => {
        this.httpClient.get<GruposConEmpleadosResponse>(`${this.baseUrl}/calendario/grupos-dia`, { params })
          .subscribe({
            next: (data) => resolve(data),
            error: (err) => reject(err)
          });
      });
    }
    

}
