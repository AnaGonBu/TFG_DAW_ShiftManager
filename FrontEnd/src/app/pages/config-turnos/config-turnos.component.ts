import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Grupo } from '../../interfaces/grupo';
import { GrupoService } from '../../services/grupo.service';
import { CommonModule } from '@angular/common';
import { TurnosService } from '../../services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-turnos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './config-turnos.component.html',
  styleUrl: './config-turnos.component.css'
})
export class ConfigTurnosComponent implements OnInit {
  turnosForm!: FormGroup;
  grupos: Grupo[] = [];
  turnosService = inject(TurnosService);

  @Output() turnosActualizados = new EventEmitter<any[]>(); 

  constructor(private fb: FormBuilder, private grupoService: GrupoService) {
    this.turnosForm = this.fb.group({});
  }

  async ngOnInit() {
    this.grupos = await this.grupoService.getAllWithPromises();
    this.initForm();
  }

  initForm() {
    //precarga de fechas en el form de inicio de los turnos, para no ponerlas cada vez para probar 
    const fechasInicio = [
      '2025-04-07', 
      '2025-04-08', 
      '2025-04-09', 
      '2025-04-10', 
      '2025-04-11', 
      '2025-04-12', 
      '2025-04-13'  
    ];
  
    const formControls = this.grupos.reduce((acc, grupo, index) => {
      acc[grupo.idGrupo] = this.fb.group({
        fechaInicio: [fechasInicio[index] || '', Validators.required], 
        frecuenciaDias: [7, [Validators.required, Validators.min(1)]]
      });
      return acc;
    }, {} as any);
  
    this.turnosForm = this.fb.group(formControls);
  }

  guardarTurnos() {
    const turnos = Object.keys(this.turnosForm.value).map(idGrupo => ({
      idGrupo: Number(idGrupo),
      fechaInicio: new Date(this.turnosForm.value[idGrupo].fechaInicio),
      frecuenciaDias: this.turnosForm.value[idGrupo].frecuenciaDias
    }));

    this.turnosService.actualizarTurnos(turnos); 
    Swal.fire({
      icon: 'success',
      title: 'Turnos guardados',
      text: 'Los turnos se han actualizado correctamente.',
    });
  }

}