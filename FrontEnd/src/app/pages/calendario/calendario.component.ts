import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { ConfigTurnosComponent } from '../config-turnos/config-turnos.component';
import { TurnosService } from '../../services/turnos.service';
import { EmpleadoService } from '../../services/empleado.service';
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
    events: []
    };

  turnosService = inject(TurnosService);
  empleadoService = inject(EmpleadoService);

  
  constructor() {}

  ngOnInit() {
    this.turnosService.turnos$.subscribe(turnos => {
      this.actualizarEventos(turnos);
    });
  }

  actualizarEventos(turnos: any[]) {
    const eventos = turnos.flatMap(turno => this.generarEventos(turno));
    this.calendarOptions = { ...this.calendarOptions, events: eventos };
  }

  generarEventos(turno: any) {
    const eventos = [];
    let fecha = new Date(turno.fechaInicio);
    const hoy = new Date();

    while (fecha <= new Date(hoy.getFullYear(), hoy.getMonth() + 12, 0)) { //definimos hasta cuando se repite en meses (actual 12)
      eventos.push({
        title: `Grupo ${turno.idGrupo}`,
        start: fecha.toISOString().split('T')[0]
      });

      fecha.setDate(fecha.getDate() + turno.frecuenciaDias);
    }

    return eventos;
  }


}