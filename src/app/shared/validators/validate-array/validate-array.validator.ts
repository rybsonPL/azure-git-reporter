import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function validateArray(validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!Array.isArray(control.value)) {
      throw new Error('Value is not an array.');
    }

    return control.value
      .map(value => Validators.compose(validators)!(new FormControl(value)))
      .filter(error => error !== null);
  };
}
