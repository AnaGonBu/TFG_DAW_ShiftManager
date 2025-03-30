import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Grupo } from '../../interfaces/grupo';
import { GrupoService } from '../../services/grupo.service';
import { CommonModule } from '@angular/common';
import { TurnosService } from '../../services/turnos.service';

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
    const formControls = this.grupos.reduce((acc, grupo) => {
      acc[grupo.idGrupo] = this.fb.group({
        fechaInicio: ['', Validators.required],   
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

    console.log('Turnos guardados:', turnos);
    this.turnosService.actualizarTurnos(turnos); 
  }
}