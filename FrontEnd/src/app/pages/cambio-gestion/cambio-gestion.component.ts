import { Component, inject } from '@angular/core';
import { BotoneraComponent } from "../../components/botonera/botonera.component";
import { Cambio } from '../../interfaces/cambio';
import { CambiosService } from '../../services/cambios.service';

@Component({
  selector: 'app-cambio-gestion',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './cambio-gestion.component.html',
  styleUrl: './cambio-gestion.component.css'
})
export class CambioGestionComponent {

  cambioService = inject(CambiosService);
  data: any[] = [];
  listType = true;

  estadoFiltro = 'PENDIENTE';
  todosLosCambios: Cambio[] = [];

  async ngOnInit() {
    this.todosLosCambios = await this.cambioService.getCambios();
    this.filtrar(this.estadoFiltro);
  }
  
  filtrar(estado: string) {
    this.estadoFiltro = estado;
    this.data = this.todosLosCambios.filter(c => c.estado === estado);
  }

  config = {
    columns: [
      { key: 'idCambio', label: 'ID' },
      { key: 'idSolicitante', label: 'Solicita' },
      { key: 'idConcede', label: 'Concede' },
      { key: 'fechaSolicitud', label: 'Fecha Solicitud' },
      { key: 'fechaTurno1', label: 'Turno Salida' },
      { key: 'fechaTurno2', label: 'Turno Destino' },
      { key: 'estado', label: 'Estado' }
    ]
  };



}


