import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Cambio } from '../interfaces/cambio';

@Injectable({
  providedIn: 'root'
})

export class CambiosService {


  private turnosSource = new BehaviorSubject<any[]>([]); 
  turnos$ = this.turnosSource.asObservable();
  
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8085/cambios'; 
  

  insertCambio(cambio: Cambio): Promise<Cambio> {
    console.log('Enviando al backend:', cambio);
    return lastValueFrom(this.http.post<Cambio>(this.baseUrl, cambio));
  }
  
  async updateEstadoCambio(idCambio: number, nuevoEstado: string): Promise<Cambio> {
    const cambio = await this.getCambioById(idCambio); // método que deberías agregar si no está
    cambio.estado = nuevoEstado;
    return lastValueFrom(
      this.http.put<Cambio>(`${this.baseUrl}/${idCambio}/estado`, cambio)
    );
  }
  
  getCambios(): Promise<Cambio[]> {
    return lastValueFrom(this.http.get<Cambio[]>(this.baseUrl));
  }

  getCambioById(id: number): Promise<Cambio> {
    return lastValueFrom(this.http.get<Cambio>(`${this.baseUrl}/${id}`));
  }

  actualizarTurnos(turnos: any[]) {
    this.turnosSource.next(turnos); 
  }

}
