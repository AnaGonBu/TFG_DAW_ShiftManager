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

  getAllWithPromises(): Promise<any> {
      return lastValueFrom(this.httpClient.get<{ results: Grupo[] }>(this.baseUrl));
    }

}
