import { ContainsErrorPipe } from './contains-error.pipe';

describe('containsError', () => {
  const pipe = new ContainsErrorPipe();

  describe('when given value is null', () => {
    it('should return false', () => {
      expect(pipe.transform(null, 'testKey')).toBeFalse();
    });
  });

  describe('when given value is ValidtionErrors', () => {
    describe('and value contains error', () => {
      [
        { errors: { 0: { testKey: 'Test error' } }, errorKey: 'testKey' },
        { errors: { 0: null, 1: { testKey2: 'Test error' } }, errorKey: 'testKey2' },
      ].forEach(({ errors, errorKey }) => {
        it('should return true', () => {
          expect(pipe.transform(errors, errorKey)).toBeTrue();
        });
      });
    });

    describe('and value NOT contains error', () => {
      [
        { errors: { 0: { testKey: 'Test error' } }, errorKey: 'testKey2' },
        { errors: { 0: null, 1: { testKey2: 'Test error' } }, errorKey: 'testKey' },
        { errors: { 0: null, 1: null }, errorKey: 'testKey2' },
      ].forEach(({ errors, errorKey }) => {
        it('should return true', () => {
          expect(pipe.transform(errors, errorKey)).toBeFalse();
        });
      });
    });
  });
});
