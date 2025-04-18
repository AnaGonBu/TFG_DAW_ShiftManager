import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cambio } from '../../interfaces/cambio';
import { Empleado } from '../../interfaces/empleado';
import { CambiosService } from '../../services/cambios.service';
import { EmpleadoService } from '../../services/empleado.service';
import { validarFechasCambio } from '../../validators/validar-fecha-cambio-anterior.validator';

@Component({
  selector: 'app-cambio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.css']
})
export class CambioComponent {

  router = inject(Router);
  cambioForm: FormGroup;


  arrEmpleados: Empleado[] = []
  empService = inject(EmpleadoService);
  cambioService = inject(CambiosService)  
    

  constructor() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    /**this.cambioForm = new FormGroup({
      fechaSolicitud: new FormControl(fechaActual, [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      fechaCambio: new FormControl('', [Validators.required]),
      grupo: new FormControl('', [Validators.required]),
      nombre2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      apellidos2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      fechaCambio2: new FormControl('', [Validators.required]),
      grupo2: new FormControl('', [Validators.required]),
    }, { validators: [validarFechasCambio()] });**/

    this.cambioForm = new FormGroup({
      fechaSolicitud: new FormControl(fechaActual, [Validators.required]),
      idSolicitante: new FormControl('', [Validators.required]),
      fechaCambio: new FormControl('', [Validators.required]),
      idConcede: new FormControl('', [Validators.required]),
      fechaCambio2: new FormControl('', [Validators.required])
    }, { validators: [validarFechasCambio()] });

  }

async  getDataForm() {
    if (this.cambioForm.invalid) return;
  
    const formData : Cambio = {
      idConcede: this.cambioForm.value.idConcede,
      idSolicitante:  this.cambioForm.value.idSolicitante ,
      fechaSolicitud: this.cambioForm.value.fechaSolicitud,
      fechaTurno1: this.cambioForm.value.fechaCambio,
      fechaTurno2: this.cambioForm.value.fechaCambio2 
    };
  try{
    const respuesta = await this.cambioService.insertCambio(formData);
  
    console.log('DTO para enviar:', formData);
  
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'El cambio de turno ha sido registrado correctamente',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/calendario']);
    });
  }catch (error) {
    console.error('Error al guardar el cambio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar el cambio de turno',
      confirmButtonText: 'Cerrar'
    });
  }
}

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
