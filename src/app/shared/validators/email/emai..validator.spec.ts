import { AbstractControl } from '@angular/forms';

import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  const validator = emailValidator();

  describe('when control value is not an email', () => {
    [{ value: 'not an email' }, { value: 'notan@email' }, { value: 'not@an.' }, { value: 'not.@anemail' }].forEach(
      value => {
        it('should return an error', () => {
          const control = { value } as AbstractControl;

          expect(validator(control)).toEqual({ email: 'Invalid email' });
        });
      }
    );
  });

  describe('when control value ', () => {
    it('is an email it should return null', () => {
      const control = { value: 'an@email.pl' } as AbstractControl;

      expect(validator(control)).toBeNull();
    });

    it('is null it should return null', () => {
      const control = { value: null } as AbstractControl;

      expect(validator(control)).toBeNull();
    });
  });
});
