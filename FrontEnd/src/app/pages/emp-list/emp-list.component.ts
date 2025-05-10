import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpCardComponent } from '../../components/emp-card/emp-card.component';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-emp-list',
  imports: [EmpCardComponent,],
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css'
})
export class EmpListComponent {

  arrEmpleados: Empleado[] = []
  empService = inject(EmpleadoService);

  //nuevo
  empleadosTurnos: Empleado[] =[]
  tituloPagina: string = "Listado de Empleados";
  idGrupoActual: number | null = null;
  fechaActual: string | null = null;
  grupoService = inject(GrupoService); // To get all employees if no params
  route = inject(ActivatedRoute);
empleadosAgrupadosParaVistaGeneral: any;

  //page: number = 1;
  //pageSize: number = 8;

  async ngOnInit(): Promise<void> {
    try {
      this.arrEmpleados = await this.empService.getAllWithPromises();
      console.log('arrEmpleados:', this.arrEmpleados);
    }
    catch (err) {
      console.log('Error al conectar a la API: '+err)
    }
    
  }


}
