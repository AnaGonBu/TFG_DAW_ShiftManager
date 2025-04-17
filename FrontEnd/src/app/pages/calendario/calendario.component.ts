import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EmpleadoService } from '../../services/empleado.service';
import { TurnosService } from '../../services/turnos.service';

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

  turnosService = inject(TurnosService);
  empleadoService = inject(EmpleadoService);
  
  constructor() {}

  ngOnInit() {
    this.turnosService.turnos$.subscribe(turnos => {
      this.actualizarGrupos(turnos);
    });
  }

  actualizarGrupos(turnos: any[]) {
    const eventos = turnos.flatMap(turno => this.cargarGrupos(turno));
    this.calendarOptions = { ...this.calendarOptions, events: eventos };
  }

  cargarGrupos(turno: any) { 
    const eventos = [];
    let fecha = new Date(turno.fechaInicio);
    const hoy = new Date();

    while (fecha <= new Date(hoy.getFullYear(), hoy.getMonth() + 6, 0)) { //definimos hasta cuando se repite en meses (actual 6 meses)
      eventos.push({
        title: `Grupo ${turno.idGrupo}`,
        start: fecha.toISOString().split('T')[0]
      });

      fecha.setDate(fecha.getDate() + turno.frecuenciaDias);
    }

    return eventos;
  }




  cargarEmpleados(arg: any) {
    const idGrupo = arg.event.title.replace('idGrupo ', '');
    const collapseId = `collapseGrupo${idGrupo}${arg.event.startStr.replaceAll('-', '')}`;
  
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
          <div id="empleados-${idGrupo}">Cargando...</div>
        </div>
      </div>
    `;
  
    this.empleadoService.getByGrupo(+idGrupo).then(empleados => {
      const contenedor = document.getElementById(`empleados-${idGrupo}`);
      if (contenedor) {
        contenedor.innerHTML = empleados.length > 0
          ? empleados.map(e => `<div>• ${e.nombre} ${e.apellidos}</div>`).join('')
          : '<div class="text-muted">No hay empleados asignados</div>';
      }
    }).catch(() => {
      const contenedor = document.getElementById(`empleados-${idGrupo}`);
      if (contenedor) {
        contenedor.innerHTML = '<div class="text-danger">Error al cargar empleados</div>';
      }
    });
  
    return { domNodes: [container] };
  }
  

}