import { FormControl, FormGroup } from '@angular/forms';

export type FormGroupFrom<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
