import { AbstractControl } from '@angular/forms';

import { requiredTruthy } from './required-truthy.validator';

describe('requiredTruthy', () => {
  const validator = requiredTruthy();

  describe('when control value is truthy should return null', () => {
    [true, 1, '2', 0.2].forEach(value => {
      it('should return an error', () => {
        const control = { value } as AbstractControl;

        expect(validator(control)).toBeNull();
      });
    });
  });

  describe('when control value is falsy should return an error', () => {
    [false, null, '', undefined, 0].forEach(value => {
      it('should return an error', () => {
        const control = { value } as AbstractControl;

        expect(validator(control)).toEqual({ falsyValue: 'Falsy value' });
      });
    });
  });
});
