import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../../interfaces/grupo'; // Assuming this interface matches backend DTO/Entity
import { GrupoService } from '../../services/grupo.service';

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  grupoScheduled?: { idGrupo: number; nombreGrupo: string };
}

@Component({
  selector: 'app-calendario', // More specific selector
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'] // Plural styleUrls
})
export class CalendarComponent implements OnInit {
  grupoService = inject(GrupoService);
  router = inject(Router);

  currentDate: Date = new Date();
  monthDays: CalendarDay[] = [];
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; // Start with Monday

  private grupos: Grupo[] = [];

  async ngOnInit() {
    await this.loadGrupos();
    this.generateCalendarDays();
  }

  async loadGrupos() {
    try {
      // Assuming getAllWithPromises returns Grupo[] matching your backend structure
      // including fechaInicio as string or Date, and frecuencia as number
      this.grupos = await this.grupoService.getAllWithPromises();
      // Ensure fechaInicio is a Date object if it comes as a string
      this.grupos.forEach(g => {
        if (typeof g.fechaInicio === 'string') {
          g.fechaInicio = new Date(g.fechaInicio);
        }
      });
    } catch (error) {
      console.error("Error loading grupos", error);
      this.grupos = [];
    }
  }

  generateCalendarDays() {
    this.monthDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    // Adjust to start week on Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let dayOfWeekOfFirst = firstDayOfMonth.getDay();
    if (dayOfWeekOfFirst === 0) dayOfWeekOfFirst = 7; // Sunday is 7th day for us
    const daysBefore = dayOfWeekOfFirst - 1;


    // Days from previous month
    for (let i = 0; i < daysBefore; i++) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - (daysBefore - i));
      this.monthDays.push({
        date: date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        grupoScheduled: this.getGrupoForDate(date)
      });
    }

    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      this.monthDays.push({
        date: date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        grupoScheduled: this.getGrupoForDate(date)
      });
    }

    // Days from next month to fill the grid (usually up to 6 weeks * 7 days = 42 cells)
    const totalCells = Math.ceil(this.monthDays.length / 7) * 7; // Ensure full weeks
    let daysAfter = totalCells - this.monthDays.length;
    if (this.monthDays.length < 35 && totalCells < 35) daysAfter += 7; // ensure at least 5 rows
    if (this.monthDays.length < 42 && totalCells < 42 && daysAfter < 7) daysAfter = 42 - this.monthDays.length;


    for (let i = 1; i <= daysAfter; i++) {
      const date = new Date(lastDayOfMonth);
      date.setDate(date.getDate() + i);
      this.monthDays.push({
        date: date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        grupoScheduled: this.getGrupoForDate(date)
      });
    }
  }

  getGrupoForDate(date: Date): { idGrupo: number; nombreGrupo: string } | undefined {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Normalize for comparison

    for (const grupo of this.grupos) {
      if (!grupo.fechaInicio || !grupo.frecuencia || grupo.frecuencia <= 0) {
        continue;
      }
      
      let fechaInicioGrupo = new Date(grupo.fechaInicio); // Make sure it's a Date object
      fechaInicioGrupo.setHours(0, 0, 0, 0); // Normalize

      if (normalizedDate >= fechaInicioGrupo) {
        const diffTime = Math.abs(normalizedDate.getTime() - fechaInicioGrupo.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays % grupo.frecuencia === 0) {
          return { idGrupo: grupo.idGrupo, nombreGrupo: grupo.nombreGrupo || `Grupo ${grupo.idGrupo}` };
        }
      }
    }
    return undefined;
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  goToToday() {
    this.currentDate = new Date();
    this.generateCalendarDays();
  }

  selectGrupo(grupoId: number, date: Date) {
    // Construir la fecha en formato YYYY-MM-DD usando la fecha local
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
  
    this.router.navigate(['/empleados/grupo', grupoId], { queryParams: { fecha: dateString } });
  }


}
