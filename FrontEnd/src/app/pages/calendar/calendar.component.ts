// import { CommonModule } from '@angular/common';
// import { Component, OnInit, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { Grupo } from '../../interfaces/grupo'; // Assuming this interface matches backend DTO/Entity
// import { GrupoService } from '../../services/grupo.service';

// interface CalendarDay {
//   date: Date;
//   dayOfMonth: number;
//   isCurrentMonth: boolean;
//   isToday: boolean;
//   grupoScheduled?: { idGrupo: number; nombreGrupo: string };
// }

// @Component({
//   selector: 'app-calendario', // More specific selector
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css'] // Plural styleUrls
// })
// export class CalendarComponent implements OnInit {
//   grupoService = inject(GrupoService);
//   router = inject(Router);

//   currentDate: Date = new Date();
//   monthDays: CalendarDay[] = [];
//   monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
//   dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; // Start with Monday

//   private grupos: Grupo[] = [];

//   async ngOnInit() {
//     await this.loadGrupos();
//     this.generateCalendarDays();
//   }

//   async loadGrupos() {
//     try {
//       // Assuming getAllWithPromises returns Grupo[] matching your backend structure
//       // including fechaInicio as string or Date, and frecuencia as number
//       this.grupos = await this.grupoService.getAllWithPromises();
//       // Ensure fechaInicio is a Date object if it comes as a string
//       this.grupos.forEach(g => {
//         if (typeof g.fechaInicio === 'string') {
//           g.fechaInicio = new Date(g.fechaInicio);
//         }
//       });
//     } catch (error) {
//       console.error("Error loading grupos", error);
//       this.grupos = [];
//     }
//   }

//   generateCalendarDays() {
//     this.monthDays = [];
//     const year = this.currentDate.getFullYear();
//     const month = this.currentDate.getMonth();

//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Normalize today for comparison

//     // Adjust to start week on Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
//     let dayOfWeekOfFirst = firstDayOfMonth.getDay();
//     if (dayOfWeekOfFirst === 0) dayOfWeekOfFirst = 7; // Sunday is 7th day for us
//     const daysBefore = dayOfWeekOfFirst - 1;


//     // Days from previous month
//     for (let i = 0; i < daysBefore; i++) {
//       const date = new Date(firstDayOfMonth);
//       date.setDate(date.getDate() - (daysBefore - i));
//       this.monthDays.push({
//         date: date,
//         dayOfMonth: date.getDate(),
//         isCurrentMonth: false,
//         isToday: date.getTime() === today.getTime(),
//         grupoScheduled: this.getGrupoForDate(date)
//       });
//     }

//     // Days of current month
//     for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
//       const date = new Date(year, month, i);
//       this.monthDays.push({
//         date: date,
//         dayOfMonth: i,
//         isCurrentMonth: true,
//         isToday: date.getTime() === today.getTime(),
//         grupoScheduled: this.getGrupoForDate(date)
//       });
//     }

//     // Days from next month to fill the grid (usually up to 6 weeks * 7 days = 42 cells)
//     const totalCells = Math.ceil(this.monthDays.length / 7) * 7; // Ensure full weeks
//     let daysAfter = totalCells - this.monthDays.length;
//     if (this.monthDays.length < 35 && totalCells < 35) daysAfter += 7; // ensure at least 5 rows
//     if (this.monthDays.length < 42 && totalCells < 42 && daysAfter < 7) daysAfter = 42 - this.monthDays.length;


//     for (let i = 1; i <= daysAfter; i++) {
//       const date = new Date(lastDayOfMonth);
//       date.setDate(date.getDate() + i);
//       this.monthDays.push({
//         date: date,
//         dayOfMonth: date.getDate(),
//         isCurrentMonth: false,
//         isToday: date.getTime() === today.getTime(),
//         grupoScheduled: this.getGrupoForDate(date)
//       });
//     }
//   }

//   getGrupoForDate(date: Date): { idGrupo: number; nombreGrupo: string } | undefined {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0); // Normalize for comparison

//     for (const grupo of this.grupos) {
//       if (!grupo.fechaInicio || !grupo.frecuencia || grupo.frecuencia <= 0) {
//         continue;
//       }
      
//       let fechaInicioGrupo = new Date(grupo.fechaInicio); // Make sure it's a Date object
//       fechaInicioGrupo.setHours(0, 0, 0, 0); // Normalize

//       if (normalizedDate >= fechaInicioGrupo) {
//         const diffTime = Math.abs(normalizedDate.getTime() - fechaInicioGrupo.getTime());
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
//         if (diffDays % grupo.frecuencia === 0) {
//           return { idGrupo: grupo.idGrupo, nombreGrupo: grupo.nombreGrupo || `Grupo ${grupo.idGrupo}` };
//         }
//       }
//     }
//     return undefined;
//   }

//   previousMonth() {
//     this.currentDate.setMonth(this.currentDate.getMonth() - 1);
//     this.generateCalendarDays();
//   }

//   nextMonth() {
//     this.currentDate.setMonth(this.currentDate.getMonth() + 1);
//     this.generateCalendarDays();
//   }

//   goToToday() {
//     this.currentDate = new Date();
//     this.generateCalendarDays();
//   }

//   selectGrupo(grupoId: number, date: Date) {
//     // Construir la fecha en formato YYYY-MM-DD usando la fecha local
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-indexed
//     const day = date.getDate().toString().padStart(2, '0');
//     const dateString = `${year}-${month}-${day}`;
  
//     this.router.navigate(['/empleados/grupo', grupoId], { queryParams: { fecha: dateString } });
//   }


// }
// En calendar.component.ts

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../../interfaces/grupo';
import { GrupoService } from '../../services/grupo.service';

interface CalendarDay {
  date: Date; // Fecha LOCAL del día en el calendario
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  grupoScheduled?: { idGrupo: number; nombreGrupo: string };
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  grupoService = inject(GrupoService);
  router = inject(Router);

  currentDate: Date = new Date();
  monthDays: CalendarDay[] = [];
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  private grupos: Grupo[] = []; // Aquí se guardan los datos de los grupos traídos del backend

  async ngOnInit() {
    await this.loadGrupos();
    this.generateCalendarDays();
  }

  async loadGrupos() {
    try {
      this.grupos = await this.grupoService.getAllWithPromises();
      console.log("FRONTEND Calendar: Grupos cargados:", this.grupos);
      // Es crucial verificar qué formato tiene grupo.fechaInicio aquí.
      // Si es string "YYYY-MM-DD", está bien para el parseo posterior.
      // Si es objeto Date, ¿representa Local o UTC? Asumiremos que queremos Local.
    } catch (error) {
      console.error("FRONTEND Calendar: Error loading grupos", error);
      this.grupos = [];
    }
  }

  // --- Funciones Helper (iguales que antes) ---
  private parseYYYYMMDDToLocalDate(dateString: string): Date {
    const parts = dateString.split('-');
    if (parts.length !== 3) throw new Error("Formato de fecha inválido, se esperaba YYYY-MM-DD");
    // Crea fecha LOCAL explícitamente a medianoche
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 0, 0, 0, 0);
  }

  private daysBetweenLocalDates(startDate: Date, endDate: Date): number {
    // Clonar y normalizar a medianoche local para asegurar comparación de días completos
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const diffTime = end.getTime() - start.getTime();
    // Usar Math.round para mitigar pequeños errores por DST al dividir.
    // Para una precisión absoluta, se necesitaría una librería o un cálculo más complejo.
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }
  // --- Fin Funciones Helper ---


  generateCalendarDays() {
    // ... (lógica para generar los días del mes, sin cambios) ...
    // Asegúrate que al crear las CalendarDay, la 'date' sea un objeto Date LOCAL correcto.
    // Ejemplo dentro del bucle de días del mes actual:
    // const date = new Date(year, month, i); // Esto crea una fecha LOCAL
    // this.monthDays.push({
    //   date: date,
    //   dayOfMonth: i,
    //   isCurrentMonth: true,
    //   isToday: date.getTime() === today.getTime(), // today también debe ser local y normalizado
    //   grupoScheduled: this.getGrupoForDate(date) // <<< Llamada a la función clave
    // });
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
    // Corrección para asegurar 6 filas si es necesario (ej: Oct 2026 empieza en viernes)
     const requiredCells = 42; // Siempre mostrar 6 semanas x 7 días
     daysAfter = requiredCells - this.monthDays.length;


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

  /**
   * Encuentra qué grupo tiene turno en una fecha específica.
   * Intenta replicar la lógica de 'grupoTieneTurnoEnFecha' del backend.
   * @param dateAConsultar Objeto Date LOCAL que representa el día del calendario.
   */
  getGrupoForDate(dateAConsultar: Date): { idGrupo: number; nombreGrupo: string } | undefined {
    // Normalizar la fecha a consultar a medianoche LOCAL
    const fechaConsultarNormalizada = new Date(dateAConsultar.getFullYear(), dateAConsultar.getMonth(), dateAConsultar.getDate());

    // console.log(`FRONTEND Calendar: Verificando fecha ${this.dateToYYYYMMDD(fechaConsultarNormalizada)}`); // Log opcional

    for (const grupo of this.grupos) {
        // console.log(`FRONTEND Calendar: -- Verificando Grupo ID: ${grupo.idGrupo}`); // Log opcional
        if (!grupo.fechaInicio || !grupo.frecuencia || grupo.frecuencia <= 0) {
            // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: Datos incompletos.`); // Log opcional
            continue;
        }

        let fechaInicioGrupoLocal: Date;
        try {
            // Consistentemente parsear/convertir fechaInicio a Date LOCAL
            if (typeof grupo.fechaInicio === 'string') {
                 // Asumir que el string es YYYY-MM-DD y parsearlo como LOCAL
                 fechaInicioGrupoLocal = this.parseYYYYMMDDToLocalDate(grupo.fechaInicio);
            } else if (grupo.fechaInicio instanceof Date) {
                 // Si ya es Date, CLONAR y normalizar a LOCAL midnight
                 fechaInicioGrupoLocal = new Date(grupo.fechaInicio.getFullYear(), grupo.fechaInicio.getMonth(), grupo.fechaInicio.getDate());
            } else {
                 console.error("FRONTEND Calendar: Tipo inesperado para fechaInicio:", grupo.fechaInicio);
                 continue;
            }
            // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: Fecha Inicio (Local): ${this.dateToYYYYMMDD(fechaInicioGrupoLocal)}, Frecuencia: ${grupo.frecuencia}`); // Log opcional

        } catch (e) {
            console.error("FRONTEND Calendar: Error procesando fechaInicio para Grupo ID", grupo.idGrupo, grupo.fechaInicio, e);
            continue;
        }


        // Comparar fechas locales normalizadas (equivalente a isBefore)
        if (fechaConsultarNormalizada.getTime() < fechaInicioGrupoLocal.getTime()) {
            // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: Fecha consulta es anterior a inicio. Saltando.`); // Log opcional
            continue;
        }

        // Calcular diferencia de días (local vs local)
        const diasDiferencia = this.daysBetweenLocalDates(fechaInicioGrupoLocal, fechaConsultarNormalizada);
        // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: Días diferencia: ${diasDiferencia}`); // Log opcional


        if (diasDiferencia < 0) {
             // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: Días diferencia negativos (${diasDiferencia}). Saltando.`); // Log opcional
             continue; // Seguridad extra
        }

        // Comprobación del módulo (equivalente a diasDiferencia % frecuencia == 0)
        if (diasDiferencia % grupo.frecuencia === 0) {
            // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: ¡TIENE TURNO! (diasDif ${diasDiferencia} % frec ${grupo.frecuencia} == 0)`); // Log opcional
            return { idGrupo: grupo.idGrupo, nombreGrupo: grupo.nombreGrupo || `Grupo ${grupo.idGrupo}` };
        } else {
             // console.log(`FRONTEND Calendar: ---- Grupo ${grupo.idGrupo}: No tiene turno (diasDif ${diasDiferencia} % frec ${grupo.frecuencia} != 0)`); // Log opcional
        }
    }

    // Si ningún grupo coincide
    // console.log(`FRONTEND Calendar: No se encontró grupo con turno para fecha ${this.dateToYYYYMMDD(fechaConsultarNormalizada)}`); // Log opcional
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
    // Usa la fecha LOCAL del día del calendario
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`; // YYYY-MM-DD local

    console.log(`FRONTEND Calendar: Navegando a grupo ${grupoId} para fecha ${dateString}`);
    this.router.navigate(['/empleados/grupo', grupoId], { queryParams: { fecha: dateString } });
  }
}
