// eslint-disable-next-line unicorn/prevent-abbreviations
export const prop = (path, defaultValue) => (properties = {}) => {
  if (typeof properties[path] !== 'undefined') {
    return properties[path];
  }

  if (path && path.indexOf('.') > 0) {
    const paths = path.split('.');
    const { length } = paths;
    let object = properties[paths[0]];
    let index = 1;

    while (object !== undefined && index < length) {
      object = object[paths[index]];
      index += 1;
    }

    if (typeof object !== 'undefined') {
      return object;
    }
  }

  return defaultValue;
};
