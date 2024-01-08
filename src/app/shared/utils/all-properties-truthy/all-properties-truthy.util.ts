export function allPropertiesTruthy<T extends object>(object: T | null): boolean {
  if (!object) {
    return false;
  }

  const values = Object.values(object);

  if (!values.length) {
    return false;
  }

  return Object.values(object).every(value => {
    if (Array.isArray(value)) {
      return !!value.length;
    }

    if (typeof value !== 'object') {
      return !!value;
    }

    return allPropertiesTruthy(value);
  });
}
