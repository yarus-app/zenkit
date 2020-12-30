import prop from './prop';

const withProp = (needle, function_) => (properties = {}) => {
  if (Array.isArray(needle)) {
    const needles = needle.map((argument) =>
      withProp(argument, (x) => x)(properties)
    );
    return function_(...needles);
  }
  if (typeof needle === 'function') {
    return function_(needle(properties));
  }
  return function_(prop(needle)(properties));
};

export default withProp;
