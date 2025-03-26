import { Component, Input } from '@angular/core';
import { Empleado } from '../../interfaces/empleado';
import { BotoneraComponent } from '../botonera/botonera.component';

@Component({
  selector: 'app-emp-card',
  imports: [BotoneraComponent],
  templateUrl: './emp-card.component.html',
  styleUrl: './emp-card.component.css'
})
export class EmpCardComponent {

    @Input() miEmp!: Empleado;
    
}
