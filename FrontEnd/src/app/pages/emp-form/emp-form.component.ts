import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { validarEdadMinima } from '../../validators/edad-minima.validator';

@Component({
  selector: 'app-emp-form',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './emp-form.component.html',
  styleUrl: './emp-form.component.css'
})
export class EmpFormComponent {

  router = inject(Router);
  empService = inject(EmpleadoService);
  activatedRoute = inject(ActivatedRoute);

  empForm: FormGroup;
  tipo: string;

  constructor() {
    this.tipo = "Nuevo";

    this.empForm = new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      apellidos: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      email: new FormControl('', [Validators.required,Validators.email]),    
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
      domicilio: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      situacion: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      idGrupo: new FormControl('', [Validators.required])
    }, { validators: [validarEdadMinima()] });
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.idEmp) {
        this.tipo = "Actualizar"
        const empResponse : Empleado = await this.empService.getById(params.idEmp);

        this.empForm = new FormGroup({
          idEmp: new FormControl(empResponse.idEmp, []),
          nombre: new FormControl(empResponse.nombre, [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          apellidos: new FormControl(empResponse.apellidos, [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          email: new FormControl(empResponse.email, [Validators.required,Validators.email]),
          password: new FormControl(empResponse.password, [Validators.required]),
          rol: new FormControl(empResponse.rol, [Validators.required]),
          imagen: new FormControl(empResponse.imagen, [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
          domicilio: new FormControl(empResponse.domicilio, [Validators.required]),
          fechaIngreso: new FormControl(empResponse.fechaIngreso, [Validators.required]),
          fechaNacimiento: new FormControl(empResponse.fechaNacimiento, [Validators.required]),
          situacion: new FormControl(empResponse.situacion, [Validators.required]),
          estado: new FormControl(empResponse.estado, [Validators.required]),
          idGrupo: new FormControl(empResponse.idGrupo, [Validators.required])
        }, { validators: [validarEdadMinima()] }); 
      }
    });
}

getDataForm() {
  if (this.empForm.invalid) return;

  const datosEmp = this.empForm.value;

  

  if (datosEmp.idEmp) {
    this.empService.update(datosEmp.idEmp, datosEmp)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `${datosEmp.nombre} actualizado correctamente`,
          showConfirmButton: true,
          timer: 3000
        });
        this.router.navigate(['/empleados']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: `Error al actualizar ${datosEmp.nombre}`,
          showConfirmButton: true
        });
      });
  } else {
    this.empService.insert(datosEmp)
      .then((empCreado) => {
        Swal.fire({
          icon: 'success',
          title: `${empCreado.nombre} creado correctamente`,
          showConfirmButton: true,
          timer: 3000
        });
        this.router.navigate(['/empleados']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el empleado',
          showConfirmButton: true
        });
      });
  }
}


}
