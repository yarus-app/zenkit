import theme from './theme';
import getValueAndUnit from './get-value-and-unit';

const rem = (pxval, base) => (props = {}) => {
  const [value] = getValueAndUnit(pxval);

  const [newBase] = getValueAndUnit(base || theme('fontSize', '16px')(props));

  return `${value / newBase}rem`;
};

export default rem;
