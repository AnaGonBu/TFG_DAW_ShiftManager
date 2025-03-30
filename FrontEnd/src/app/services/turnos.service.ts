import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private turnosSource = new BehaviorSubject<any[]>([]); 
  turnos$ = this.turnosSource.asObservable(); 

  actualizarTurnos(turnos: any[]) {
    this.turnosSource.next(turnos); 
  }
}
