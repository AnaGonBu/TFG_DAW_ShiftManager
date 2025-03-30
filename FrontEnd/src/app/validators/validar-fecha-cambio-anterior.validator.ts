import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarFechasCambio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaSolicitud = control.get('fechaSolicitud')?.value;
    const fechaCambio = control.get('fechaCambio')?.value;
    const fechaCambio2 = control.get('fechaCambio2')?.value;

    if (!fechaSolicitud || !fechaCambio || !fechaCambio2) {
      return null; // No validar hasta que estén todas las fechas
    }

    const fechaSol = new Date(fechaSolicitud);
    const fecha1 = new Date(fechaCambio);
    const fecha2 = new Date(fechaCambio2);

    let errors: ValidationErrors = {};

    if (fecha1 <= fechaSol) {
      errors['fechaCambioInvalida'] = true;
    }
    if (fecha2 <= fechaSol) {
      errors['fechaCambio2Invalida'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
