const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

export const getValueAndUnit = (value) => {
  if (typeof value !== 'string') return [value, ''];
  const matchedValue = value.match(cssRegex);
  if (matchedValue) return [Number.parseFloat(value), matchedValue[2]];
  return [value, undefined];
};

export default getValueAndUnit;
