import { FormControl, FormGroup } from '@angular/forms';

export type FormGroupFrom<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

// import { FormControl, FormGroup } from '@angular/forms';

// export type FormGroupFrom<T> = FormGroup<{
//   [K in keyof T]: T[K] extends object ? FormGroupFrom<T[K]> : FormControl<T[K]>;
// }>;
