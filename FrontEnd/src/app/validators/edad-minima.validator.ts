import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarEdadMinima(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = control.get('fechaNacimiento')?.value;
    const fechaIngreso = control.get('fechaIngreso')?.value;

    if (!fechaNacimiento || !fechaIngreso) {
      return null; // Esperar a que ambos campos estén completos
    }

    const edad = calcularEdad(new Date(fechaNacimiento), new Date(fechaIngreso));
    return edad >= 18 ? null : { edadInvalida: true };
  };
}

function calcularEdad(fechaNacimiento: Date, fechaIngreso: Date): number {
  let edad = fechaIngreso.getFullYear() - fechaNacimiento.getFullYear();
  const mes = fechaIngreso.getMonth() - fechaNacimiento.getMonth();
  if (mes < 0 || (mes === 0 && fechaIngreso.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
