import { allPropertiesTruthy } from './all-properties-truthy.util';

describe('allPropertiesTruthy()', () => {
  describe('returns true when', () => {
    [
      {
        title: 'all properties are truthy',
        object: {
          prop1: 'value',
          prop2: 42,
          prop3: [1, 2, 3],
          prop4: true,
        },
      },
      {
        title: 'all properties are truthy in nested object',
        object: {
          prop1: 'value',
          prop2: [1, 2, 3],
          prop3: {
            nestedProp1: 'nestedValue',
            nestedProp2: [4, 5, 6],
          },
        },
      },
    ].forEach(({ title, object }) => {
      it(title, () => {
        expect(allPropertiesTruthy(object)).toBe(true);
      });
    });
  });

  describe('returns false when', () => {
    [
      {
        title: 'at least one property is falsy',
        object: {
          prop1: 'value',
          prop2: null,
          prop3: [1, 2, 3],
          prop4: {
            nestedProp: 'nestedValue',
          },
        },
      },
      {
        title: 'contains false value',
        object: {
          prop1: 'value',
          prop2: false,
          prop3: [1, 2, 3],
          prop4: {
            nestedProp: 'nestedValue',
          },
        },
      },
      {
        title: 'contains empty string value',
        object: {
          prop1: 'value',
          prop2: '',
          prop3: [1, 2, 3],
          prop4: {
            nestedProp: 'nestedValue',
          },
        },
      },
      {
        title: 'object is empty',
        object: {},
      },
      {
        title: 'object is null',
        object: null,
      },
      {
        title: 'nested object contains null',
        object: {
          prop1: 'value',
          prop2: null,
          prop3: {
            nestedProp1: 'nestedValue',
            nestedProp2: null,
          },
        },
      },
      {
        title: 'nested object contains empty object',
        object: {
          prop1: 'value',
          prop2: null,
          prop3: {
            nestedProp1: 'nestedValue',
            nestedProp2: {},
          },
        },
      },
    ].forEach(({ title, object }) => {
      it(title, () => {
        expect(allPropertiesTruthy(object)).toBe(false);
      });
    });
  });
});
