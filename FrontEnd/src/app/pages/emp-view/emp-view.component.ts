import { Component, inject } from '@angular/core';
import { Empleado } from '../../interfaces/empleado';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { BotoneraComponent } from '../../components/botonera/botonera.component';

@Component({
  selector: 'app-emp-view',
  imports: [BotoneraComponent],
  templateUrl: './emp-view.component.html',
  styleUrl: './emp-view.component.css'
})
export class EmpViewComponent {

  empService = inject(EmpleadoService);
  activatedRoute = inject(ActivatedRoute);

  miEmp!: Empleado;

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      let idEmp: number = params.idEmp as number;

      try {
        this.miEmp = await this.empService.getById(idEmp);
        console.log("Empleado recibido:", this.miEmp);
      } catch (err) {
        console.log("Error al llamar a la API: " + err);
      }
    });
  }

}
