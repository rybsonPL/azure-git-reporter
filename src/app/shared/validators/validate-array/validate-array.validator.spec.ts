import { AbstractControl, Validators } from '@angular/forms';

import { validateArray } from './validate-array.validator';

describe('validateArray', () => {
  const validator = validateArray([Validators.min(10)]);

  describe('when control value is not array', () => {
    it('should throw an error', () => {
      const control = { value: 'not an array array' } as AbstractControl;

      expect(() => validator(control)).toThrowError('Value is not an array');
    });
  });

  describe('when control value is array', () => {
    describe('and array values are invalid', () => {
      it('should return errors for one value', () => {
        const control = { value: [1, 10, 20] } as AbstractControl;
        const result = validator(control);

        expect(Array.isArray(result)).toBeTrue();
        expect(result).toEqual([{ min: { min: 10, actual: 1 } }]);
      });

      it('should return errors for 2 values', () => {
        const control = { value: [1, 5, 20] } as AbstractControl;
        const result = validator(control);

        expect(Array.isArray(result)).toBeTrue();
        expect(result).toEqual([{ min: { min: 10, actual: 1 } }, { min: { min: 10, actual: 5 } }]);
      });
    });

    describe('and value is valid', () => {
      it('should not return an error', () => {
        const control = { value: [10, 10, 20, null] } as AbstractControl;
        const result = validator(control);

        expect(result).toEqual([]);
      });
    });
  });
});
