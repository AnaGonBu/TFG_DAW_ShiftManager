import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { GrupoService } from '../../services/grupo.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Grupo } from '../../interfaces/grupo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    firstDay: 1,
    events: [],
    eventContent: this.cargarEmpleados.bind(this)
  };

  grupoService = inject(GrupoService);
  empleadoService = inject(EmpleadoService);

  constructor() {}

  async ngOnInit() {
    const grupos = await this.grupoService.getAllWithPromises();
    const eventos = grupos.flatMap(grupo => this.generarEventosGrupo(grupo));
    this.calendarOptions = { ...this.calendarOptions, events: eventos };
  }

  generarEventosGrupo(grupo: Grupo) {
    const eventos = [];
    let fecha = new Date(grupo.fechaInicio);
    const hoy = new Date();

    
    const fechaLimite = new Date(hoy.getFullYear(), hoy.getMonth() + 6, 0); //definimos los meses de turnos mostrados (actual 6)

    while (fecha <= fechaLimite) {
      eventos.push({
        title: `Grupo ${grupo.idGrupo}`,
        start: fecha.toISOString().split('T')[0]
      });

      fecha.setDate(fecha.getDate() + grupo.frecuencia); 
    }

    return eventos;
  }

  cargarEmpleados(arg: any) {
    const idGrupo = Number(arg.event.title.replace('Grupo ', ''));
    const fechaStr = arg.event.startStr.replaceAll('-', '');
    const collapseId = `collapseGrupo${idGrupo}${fechaStr}`;
    const empleadosDivId = `empleados-${idGrupo}-${fechaStr}`;
  
    const container = document.createElement('div');
    container.innerHTML = `
      <button 
        class="grupo-button" 
        data-bs-toggle="collapse" 
        data-bs-target="#${collapseId}">
        ${arg.event.title}
      </button>
  
      <div class="collapse mt-1" id="${collapseId}">
        <div class="card card-body p-1 text-start" style="font-size: 12px; background-color: #f8f9fa; color: #212529; border: 1px solid #6c757d;">
          <div id="${empleadosDivId}">Cargando...</div>
        </div>
      </div>
    `;
  
    this.empleadoService.getByGrupo(idGrupo).then(empleados => {
      const contenedor = document.getElementById(empleadosDivId);
      if (contenedor) {
        contenedor.innerHTML = empleados.length > 0
          ? empleados.map(e => `<div>• ${e.nombre} ${e.apellidos}</div>`).join('')
          : '<div class="text-muted">No hay empleados asignados</div>';
      }
    }).catch(() => {
      const contenedor = document.getElementById(empleadosDivId);
      if (contenedor) {
        contenedor.innerHTML = '<div class="text-danger">Error al cargar empleados</div>';
      }
    });
  
    return { domNodes: [container] };
  }

  
}


