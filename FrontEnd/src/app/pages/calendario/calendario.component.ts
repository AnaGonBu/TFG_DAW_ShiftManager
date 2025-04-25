import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { GrupoService } from '../../services/grupo.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Grupo } from '../../interfaces/grupo';
import { CambiosService } from '../../services/cambios.service';
import { Empleado } from '../../interfaces/empleado';

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
  cambiosService = inject(CambiosService);

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

  /**cargarEmpleados(arg: any) {
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
  }*/


    cargarEmpleados(arg: any) {
      const idGrupo = Number(arg.event.title.replace('Grupo ', ''));
      const fechaStr = arg.event.startStr.replaceAll('-', '');
      const fechaEvento = arg.event.startStr;
      const collapseId = `collapseGrupo${idGrupo}${fechaStr}`;
      const empleadosDivId = `empleados-${idGrupo}-${fechaStr}`;
      const cambiosDivId = `cambios-${idGrupo}-${fechaStr}`;
    
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
            <div id="${cambiosDivId}" class="mt-2"></div>
          </div>
        </div>
      `;
    
      // Cargar empleados del grupo
      this.empleadoService.getByGrupo(idGrupo).then(empleados => {
        const contenedor = document.getElementById(empleadosDivId);
        if (contenedor) {
          contenedor.innerHTML = empleados.length > 0
            ? empleados.map((e: Empleado) => `<div>• ${e.nombre} ${e.apellidos}</div>`).join('')
            : '<div class="text-muted">No hay empleados asignados</div>';
        }
      }).catch(() => {
        const contenedor = document.getElementById(empleadosDivId);
        if (contenedor) {
          contenedor.innerHTML = '<div class="text-danger">Error al cargar empleados</div>';
        }
      });
    
      // Cargar cambios solo si hay alguno ese día
      Promise.all([
        this.empleadoService.getAllWithPromises(),
        this.cambiosService.getCambios()
      ]).then(([empleados, cambios]) => {
        const cambiosDelDia = cambios.filter(c =>
          c.estado === 'ACEPTADO' &&
          (c.fechaTurno1 === fechaEvento || c.fechaTurno2 === fechaEvento)
        );
    
        if (cambiosDelDia.length === 0) return;
    
        const contenedorCambios = document.getElementById(cambiosDivId);
        if (contenedorCambios) {
          const collapseCambiosId = `collapseCambios${idGrupo}${fechaStr}`;
          contenedorCambios.innerHTML = `
            <button 
              class="btn btn-warning btn-sm fw-bold w-100 mt-2" 
              data-bs-toggle="collapse" 
              data-bs-target="#${collapseCambiosId}" 
              style="white-space: normal;">
              Cambios de turno
            </button>
            <div class="collapse mt-1" id="${collapseCambiosId}">
              <div>
                ${cambiosDelDia.map(cambio => {
                  const solicitante = empleados.find((e: Empleado) => e.idEmp === cambio.idSolicitante);
                  const concede = empleados.find((e: Empleado) => e.idEmp === cambio.idConcede);
    
                  const nombreSolicitante = solicitante ? `${solicitante.nombre} ${solicitante.apellidos}` : 'Empleado desconocido';
                  const nombreConcede = concede ? `${concede.nombre} ${concede.apellidos}` : 'Empleado desconocido';
    
                  return `<div>• <strong>${nombreSolicitante}</strong> cambia por <strong>${nombreConcede}</strong></div>`;
                }).join('')}
              </div>
            </div>
          `;
        }
      });
    
      return { domNodes: [container] };
    }
    
    
    
  
}


