import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Grupo } from '../interfaces/grupo';

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

}
