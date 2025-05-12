// // import { Component, inject } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { EmpCardComponent } from '../../components/emp-card/emp-card.component';
// // import { Empleado } from '../../interfaces/empleado';
// // import { EmpleadoService } from '../../services/empleado.service';
// // import { GrupoService } from '../../services/grupo.service';

// // @Component({
// //   selector: 'app-emp-list',
// //   imports: [EmpCardComponent,],
// //   templateUrl: './emp-list.component.html',
// //   styleUrl: './emp-list.component.css'
// // })
// // export class EmpListComponent {

// //   arrEmpleados: Empleado[] = []
// //   empService = inject(EmpleadoService);

// //   //nuevo
// //   empleadosTurnos: Empleado[] =[]
// //   tituloPagina: string = "Listado de Empleados";
// //   idGrupoActual: number | null = null;
// //   fechaActual: string | null = null;
// //   grupoService = inject(GrupoService); // To get all employees if no params
// //   route = inject(ActivatedRoute);
// // empleadosAgrupadosParaVistaGeneral: any;

// //   //page: number = 1;
// //   //pageSize: number = 8;

// //   async ngOnInit(): Promise<void> {
// //     try {
// //       this.arrEmpleados = await this.empService.getAllWithPromises();
// //       console.log('arrEmpleados:', this.arrEmpleados);
// //     }
// //     catch (err) {
// //       console.log('Error al conectar a la API: '+err)
// //     }
    
// //   }}
// import { CommonModule } from '@angular/common'; // Import CommonModule
// import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { EmpCardComponent } from '../../components/emp-card/emp-card.component';
// import { Empleado } from '../../interfaces/empleado';
// import { CambiosService } from '../../services/cambios.service'; // Import CambiosService
// import { EmpleadoService } from '../../services/empleado.service';

// interface GrupoConEmpleados {
//   grupoId: number;
//   empleados: Empleado[];
// }

// @Component({
//   selector: 'app-emp-list',
//   standalone: true, // Make component standalone
//   imports: [CommonModule, EmpCardComponent], // Add CommonModule for @if, @for
//   templateUrl: './emp-list.component.html',
//   styleUrls: ['./emp-list.component.css'] // Ensure it's styleUrls (plural)
// })
// export class EmpListComponent implements OnInit {
//   empService = inject(EmpleadoService);
//   cambiosService = inject(CambiosService); // Inject CambiosService
//   route = inject(ActivatedRoute);

//   todosLosEmpleados: Empleado[] = []; // Stores all employees, loaded once
  
//   empleadosTurnos: Empleado[] = []; // For the specific shift view
//   tituloPagina: string = "Listado de Empleados";
//   idGrupoActual: number | null = null;
//   fechaActual: string | null = null; // YYYY-MM-DD

//   // For the general fallback view, matching your HTML structure
//   empleadosAgrupadosParaVistaGeneral: GrupoConEmpleados[] = [];

//   async ngOnInit(): Promise<void> {
//     try {
//       // 1. Load all employees. This is useful for:
//       //    - Getting details of employees involved in changes (e.g., names).
//       //    - The fallback "general list" view.
//       this.todosLosEmpleados = await this.empService.getAllWithPromises();
//       this.prepareEmpleadosAgrupadosParaVistaGeneral();
//     } catch (err) {
//       console.error('Error fetching all employees:', err);
//       this.todosLosEmpleados = [];
//       this.empleadosAgrupadosParaVistaGeneral = [];
//     }

//     // 2. Listen to route parameters to determine if we show a specific shift or the general list.
//     this.route.paramMap.subscribe(params => {
//       const idGrupoParam = params.get('idGrupo');
//       this.route.queryParamMap.subscribe(async queryParams => {
//         const fechaParam = queryParams.get('fecha');

//         if (idGrupoParam && fechaParam) {
//           // Specific shift view
//           this.idGrupoActual = +idGrupoParam;
//           this.fechaActual = fechaParam;
//           // Attempt to format date for title. Using a simple split.
//           const parts = this.fechaActual.split('-');
//           const displayDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : this.fechaActual;
//           this.tituloPagina = `Turno del Grupo ${this.idGrupoActual} - ${displayDate}`;
//           await this.cargarEmpleadosDelTurnoEspecifico();
//         } else {
//           // General list view (no specific group/date from route)
//           this.idGrupoActual = null;
//           this.fechaActual = null;
//           this.empleadosTurnos = []; // Clear specific turno employees
//           this.tituloPagina = "Listado General de Empleados";
//           // The general view uses 'empleadosAgrupadosParaVistaGeneral' which is already prepared.
//         }
//       });
//     });
//   }

//   prepareEmpleadosAgrupadosParaVistaGeneral(): void {
//     if (!this.todosLosEmpleados.length) {
//       this.empleadosAgrupadosParaVistaGeneral = [];
//       return;
//     }
//     const gruposMap = new Map<number, Empleado[]>();
//     for (const empleado of this.todosLosEmpleados) {
//       if (!gruposMap.has(empleado.idGrupo)) {
//         gruposMap.set(empleado.idGrupo, []);
//       }
//       gruposMap.get(empleado.idGrupo)!.push(empleado);
//     }
//     this.empleadosAgrupadosParaVistaGeneral = Array.from(gruposMap.entries())
//       .map(([grupoId, empleados]) => ({ grupoId, empleados }))
//       .sort((a, b) => a.grupoId - b.grupoId); // Optional: sort
//   }

//   async cargarEmpleadosDelTurnoEspecifico(): Promise<void> {
//     if (!this.idGrupoActual || !this.fechaActual) {
//       this.empleadosTurnos = [];
//       return;
//     }

//     try {
//       // Get employees originally assigned to this idGrupoActual
//       const empleadosOriginalesDelGrupo = this.todosLosEmpleados.filter(
//         emp => emp.idGrupo === this.idGrupoActual
//       );

//       // Fetch all accepted shift changes
//       const todosLosCambios = await this.cambiosService.getCambios();
//       const cambiosAceptadosDelDia = todosLosCambios.filter(
//         cambio => cambio.estado === 'ACEPTADO'
//       );

//       // Use a Map to manage the final list of employees for the shift (handles additions/removals easily)
//       const empleadosFinalesMap = new Map<number, Empleado>();

//       // 1. Add employees who are originally in the group
//       for (const emp of empleadosOriginalesDelGrupo) {
//         empleadosFinalesMap.set(emp.idEmp, emp);
//       }

//       // 2. Adjust based on changes relevant to this specific date (fechaActual)
//       for (const cambio of cambiosAceptadosDelDia) {
//         const solicitanteOriginal = this.todosLosEmpleados.find(e => e.idEmp === cambio.idSolicitante);

//         // Scenario A: An employee (solicitante) GAVE UP their shift on this day.
//         // They must be from the idGrupoActual and their original shift (fechaTurno1) must be fechaActual.
//         if (
//           // This is redundant but explicitly shows string comparison
//           String(cambio.fechaTurno1) === String(this.fechaActual)  &&
//           solicitanteOriginal &&
//           solicitanteOriginal.idGrupo === this.idGrupoActual
//         ) {
//           empleadosFinalesMap.delete(cambio.idSolicitante);
//         }

//         // Scenario B: An employee (concede) IS WORKING on this day (fechaTurno2).
//         // The shift they are covering (fechaTurno1) must have been for someone in idGrupoActual on fechaActual.
//         if (
//           // This is redundant but explicitly shows string comparison
//           String(cambio.fechaTurno2) === String(this.fechaActual)  &&
//           solicitanteOriginal &&
//           solicitanteOriginal.idGrupo === this.idGrupoActual && // Crucial: the shift given up was by someone in THIS group
//           String(cambio.fechaTurno1) === String(this.fechaActual) // Crucial: the shift given up was for THIS day
//         ) {
//           const datosConcede = this.todosLosEmpleados.find(emp => emp.idEmp === cambio.idConcede);
//           if (datosConcede) {
//             empleadosFinalesMap.set(datosConcede.idEmp, datosConcede);
//           }
//         }
//       }

//       this.empleadosTurnos = Array.from(empleadosFinalesMap.values());

//     } catch (error) {
//       console.error(`Error loading employees for group ${this.idGrupoActual} on ${this.fechaActual}:`, error);
//       this.empleadosTurnos = [];
//       this.tituloPagina = `Error al cargar datos para Grupo ${this.idGrupoActual}`;
//     }
//   }
// }
// En emp-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpCardComponent } from '../../components/emp-card/emp-card.component';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { GruposConEmpleadosResponse, GrupoService } from '../../services/grupo.service';

interface GrupoConEmpleadosView {
  grupoId: number;
  empleados: Empleado[];
}

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule,EmpCardComponent],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  empleadoService = inject(EmpleadoService);
  grupoService = inject(GrupoService);
  route = inject(ActivatedRoute);

  empleadosTurnos: Empleado[] = [];
  tituloPagina: string = "Listado de Empleados";
  idGrupoActual: number | null = null;
  fechaActual: string | null = null;

  todosLosEmpleadosVistaGeneral: Empleado[] = [];
  empleadosAgrupadosParaVistaGeneral: GrupoConEmpleadosView[] = [];

  async ngOnInit(): Promise<void> {
    console.log("FRONTEND: EmpListComponent ngOnInit iniciado.");
    try {
      this.todosLosEmpleadosVistaGeneral = await this.empleadoService.getAllWithPromises();
      this.prepareEmpleadosAgrupadosParaVistaGeneral();
      console.log("FRONTEND: Vista general preparada.");
    } catch (err) {
      console.error('FRONTEND: Error fetching all employees for general view:', err);
    }

    this.route.paramMap.subscribe(params => {
      console.log("FRONTEND: paramMap emitido:", params);
      const idGrupoParam = params.get('idGrupo');
      this.route.queryParamMap.subscribe(async queryParams => {
        console.log("FRONTEND: queryParamMap emitido:", queryParams);
        const fechaParam = queryParams.get('fecha');

        if (idGrupoParam && fechaParam) {
          this.idGrupoActual = +idGrupoParam;
          this.fechaActual = fechaParam;
          console.log(`FRONTEND: Navegación de calendario detectada. idGrupoActual: ${this.idGrupoActual}, fechaActual: ${this.fechaActual}`);
          const parts = this.fechaActual.split('-');
          const displayDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : this.fechaActual;
          this.tituloPagina = `Turno del Grupo ${this.idGrupoActual} - ${displayDate}`;
          this.empleadosTurnos = []; // Limpiar antes de cargar
          await this.cargarEmpleadosDelTurnoEspecificoConEndpoint();
        } else {
          console.log("FRONTEND: Navegación general detectada (sin idGrupo o fecha).");
          this.idGrupoActual = null;
          this.fechaActual = null;
          this.empleadosTurnos = [];
          this.tituloPagina = "Listado General de Empleados";
        }
      });
    });
  }

  prepareEmpleadosAgrupadosParaVistaGeneral(): void {
    // ... (sin cambios)
    if (!this.todosLosEmpleadosVistaGeneral.length) {
      this.empleadosAgrupadosParaVistaGeneral = [];
      return;
    }
    const gruposMap = new Map<number, Empleado[]>();
    for (const empleado of this.todosLosEmpleadosVistaGeneral) {
      if (!gruposMap.has(empleado.idGrupo)) {
        gruposMap.set(empleado.idGrupo, []);
      }
      gruposMap.get(empleado.idGrupo)!.push(empleado);
    }
    this.empleadosAgrupadosParaVistaGeneral = Array.from(gruposMap.entries())
      .map(([grupoId, empleados]) => ({ grupoId, empleados }))
      .sort((a, b) => a.grupoId - b.grupoId);
  }

  async cargarEmpleadosDelTurnoEspecificoConEndpoint(): Promise<void> {
    if (!this.idGrupoActual || !this.fechaActual) {
      console.warn("FRONTEND: cargarEmpleadosDelTurnoEspecificoConEndpoint llamado sin idGrupoActual o fechaActual. No se hace nada.");
      this.empleadosTurnos = [];
      return;
    }
    console.log(`FRONTEND: Solicitando empleados para Grupo ID: ${this.idGrupoActual} en Fecha: ${this.fechaActual}`);
    try {
      const respuestaDelBackend: GruposConEmpleadosResponse =
        await this.grupoService.getGruposConMiembrosParaFecha(this.fechaActual);
      
      // Usa JSON.stringify para ver la estructura exacta, ya que la consola a veces "aplana" los objetos
      console.log('FRONTEND: Respuesta COMPLETA del backend (JSON.stringify):', JSON.stringify(respuestaDelBackend, null, 2));

      // IMPORTANTE: Las claves de un objeto que viene de JSON son SIEMPRE STRINGS
      const claveGrupoActual = this.idGrupoActual.toString();
      console.log(`FRONTEND: Buscando empleados para la clave de grupo: '${claveGrupoActual}'`);

      const empleadosDelGrupo = respuestaDelBackend[claveGrupoActual];

      if (empleadosDelGrupo && Array.isArray(empleadosDelGrupo)) { // Verificar que sea un array
        console.log(`FRONTEND: Empleados encontrados para Grupo ID ${this.idGrupoActual} (clave '${claveGrupoActual}'):`, JSON.stringify(empleadosDelGrupo, null, 2));
        // Crear una nueva instancia del array para asegurar la detección de cambios en Angular si es necesario
        this.empleadosTurnos = [...empleadosDelGrupo].sort((a, b) => 
          a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre)
        );
      } else {
        if (empleadosDelGrupo === undefined) {
            console.warn(`FRONTEND: No se encontró la clave de grupo '${claveGrupoActual}' en la respuesta del backend.`);
        } else {
            console.warn(`FRONTEND: La clave de grupo '${claveGrupoActual}' se encontró, pero el valor no es un array o está vacío/null. Valor:`, empleadosDelGrupo);
        }
        this.empleadosTurnos = [];
      }
      console.log('FRONTEND: this.empleadosTurnos final:', JSON.stringify(this.empleadosTurnos, null, 2));

    } catch (error) {
      console.error(`FRONTEND: Error en cargarEmpleadosDelTurnoEspecificoConEndpoint:`, error);
      this.empleadosTurnos = [];
      this.tituloPagina = `Error al cargar datos para Grupo ${this.idGrupoActual}`;
    }
  }
}

