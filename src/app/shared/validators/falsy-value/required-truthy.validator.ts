import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredTruthy(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      return null;
    }

    return {
      falsyValue: 'Falsy value',
    };
  };
}
