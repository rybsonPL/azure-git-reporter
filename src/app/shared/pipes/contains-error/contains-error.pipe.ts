import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'containsError',
  standalone: true,
})
export class ContainsErrorPipe implements PipeTransform {
  transform(validationErrors: ValidationErrors | null, errorKey: string): boolean {
    if (!validationErrors) {
      return false;
    }

    return Object.values(validationErrors)
      .flatMap(value => (value ? Object.keys(value) : value))
      .includes(errorKey);
  }
}
