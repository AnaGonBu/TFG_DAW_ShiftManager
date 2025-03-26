import { Component, inject } from '@angular/core';
import { EmpCardComponent } from '../../components/emp-card/emp-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-emp-list',
  imports: [EmpCardComponent, RouterLink, RouterLinkActive],
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css'
})
export class EmpListComponent {

  arrEmpleados: Empleado[] = []
  empService = inject(EmpleadoService);

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
