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
  @Input() estado!: boolean;


  async cambiarEstado() {
    if (this.estado) {
      const { isConfirmed } = await Swal.fire({
        title: '¿Está seguro de desactivar este empleado?',
        text: 'El empleado desaparecerá del calendario de turnos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar',
      });
      if (!isConfirmed) return;
    }

    let empleadoActualizado = await this.empService.updateEstado(this.idEmp);
    this.estado = empleadoActualizado.estado;

    Swal.fire({
      icon: 'success',
      title: `Estado actualizado: ${this.estado ? 'Activo' : 'Inactivo'}`,
      showConfirmButton: true,
      timer: 2000
    }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 0,500);
    });

  }
  

  //mejor no borrar empleados, y solo dejarlos inactivos
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
