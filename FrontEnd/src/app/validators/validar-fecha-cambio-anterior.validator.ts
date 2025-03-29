import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarFechaCambioAnterior(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaCambio = control.get('fechaCambio')?.value;
    const fechaCambio2 = control.get('fechaCambio2')?.value;

    if (!fechaCambio || !fechaCambio2) {
      return null; // Wait until both fields are filled
    }

    // Convert both dates to Date objects for comparison
    const fecha1 = new Date(fechaCambio);
    const fecha2 = new Date(fechaCambio2);

    // Check if fechaCambio is before fechaCambio2
    return fecha1 < fecha2 ? null : { fechaCambioInvalida: true };  // Return error if fechaCambio is not before fechaCambio2
  };
}

