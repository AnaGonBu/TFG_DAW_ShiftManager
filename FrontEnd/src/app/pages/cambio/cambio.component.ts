import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validarFechasCambio } from '../../validators/validar-fecha-cambio-anterior.validator';

@Component({
  selector: 'app-cambio',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.css']
})
export class CambioComponent {

  router = inject(Router);
  cambioForm: FormGroup;

  constructor() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    this.cambioForm = new FormGroup({
      fechaSolicitud: new FormControl(fechaActual, [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      fechaCambio: new FormControl('', [Validators.required]),
      grupo: new FormControl('', [Validators.required]),
      nombre2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      apellidos2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
      fechaCambio2: new FormControl('', [Validators.required]),
      grupo2: new FormControl('', [Validators.required]),
    }, { validators: [validarFechasCambio()] });
  }

  getDataForm() {
    if (this.cambioForm.invalid) return;
    
    alert('Formulario enviado correctamente');
    this.router.navigate(['/empleados']);
  }
}
