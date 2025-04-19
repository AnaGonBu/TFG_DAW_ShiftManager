import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Grupo } from '../../interfaces/grupo';
import { CambiosService } from '../../services/cambios.service';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-config-turnos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './config-turnos.component.html',
  styleUrl: './config-turnos.component.css'
})
export class ConfigTurnosComponent implements OnInit {
  turnosForm!: FormGroup;
  grupos: Grupo[] = [];
  cambioService = inject(CambiosService);


  @Output() turnosActualizados = new EventEmitter<any[]>(); 
  router= inject(Router);

  constructor(private fb: FormBuilder, private grupoService: GrupoService) {
    this.turnosForm = this.fb.group({});
  }

  async ngOnInit() {
    this.grupos = await this.grupoService.getAllWithPromises();
     this.initForm();
  }

  initForm() {
    const formControls = this.grupos.reduce((acc, grupo) => {
      acc[grupo.idGrupo] = this.fb.group({
        fechaInicio: [grupo.fechaInicio || '', Validators.required],
        frecuenciaDias: [grupo.frecuencia || 7, [Validators.required, Validators.min(1)]]
      });
      return acc;
    }, {} as any);
  
    this.turnosForm = this.fb.group(formControls);
  }

  guardarTurnos() {
    const turnos = Object.keys(this.turnosForm.value).map(idGrupo => {
      const rawFecha = this.turnosForm.value[idGrupo].fechaInicio;
  
      return {
        idGrupo: Number(idGrupo),
        fechaInicio: new Date(rawFecha), // convertir string a Date
        frecuencia: this.turnosForm.value[idGrupo].frecuenciaDias
      };
    });

    this.grupoService.actualizarTurnos(turnos).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Turnos guardados',
        text: 'Los turnos se han actualizado correctamente.',
      });
      this.router.navigate(['/calendario']);
    }).catch(err => {
      console.error('Error al actualizar turnos:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar los turnos. Inténtalo más tarde.',
      });
    });
  }
}
