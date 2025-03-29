import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { validarFechaCambioAnterior } from '../../validators/validar-fecha-cambio-anterior.validator';

@Component({
  selector: 'app-cambio',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cambio.component.html',
  styleUrl: './cambio.component.css'
})
export class CambioComponent {

  router = inject(Router);
  empService = inject(EmpleadoService);
  activatedRoute = inject(ActivatedRoute);

  cambioForm: FormGroup;
  tipo: string;
constructor (){
  this.tipo ="Peticion"
  this.cambioForm= new FormGroup ({
    nombre: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
    apellidos: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
    fechaCambio: new FormControl('', [Validators.required]),
    grupo: new FormControl('', [Validators.required]),
    nombre2: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
    apellidos2: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
    fechaCambio2: new FormControl('', [Validators.required]),
    grupo2: new FormControl('', [Validators.required]),
  }, { validators: [validarFechaCambioAnterior()] });
}

getDataForm() {
throw new Error('Method not implemented.');
}


}
