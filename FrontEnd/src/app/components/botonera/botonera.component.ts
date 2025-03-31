import { Component, inject, Input } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-botonera',
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  empService = inject(EmpleadoService);
  router = inject(Router);

  @Input() idEmp: number = 0;
  @Input() parent: string = "";


  async borrarEmpleado(idEmp: number) {

    const { isConfirmed } = await Swal.fire({
      title: '¿Está seguro de que quiere eliminar este empleado?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (isConfirmed) {
      let response = await this.empService.delete(idEmp);
  
      if (response.idEmp) {
        Swal.fire({
          icon: 'success',
          title: `Empleado con ID: ${response.idEmp} borrado correctamente`,
          showConfirmButton: true,
          timer: 3000
        });
        if (this.parent == 'view') {
            this.router.navigate(['/empleados']);
        } else if (this.parent == "card") {
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }

    }

  }

}
