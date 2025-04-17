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
  private baseUrl = 'http://localhost:8085/cambios'; // ajusta el puerto si hace falta
  

  insertCambio(cambio: Cambio): Promise<Cambio> {
    return lastValueFrom(this.http.post<Cambio>(this.baseUrl, cambio));
  }

  // Puedes agregar más métodos luego: getAll(), update(), etc.


  actualizarTurnos(turnos: any[]) {
    this.turnosSource.next(turnos); 
  }
}
