import theme from './theme';
import getValueAndUnit from './get-value-and-unit';

const defaults = '0.5rem';

const spacing = (value) => (props = {}) => {
  if (typeof value === 'number' && value !== 0) {
    const themeSpacing = theme('spacing', defaults)(props);
    const [spacingBase, spacingUnit] = getValueAndUnit(themeSpacing);
    return `${value * spacingBase}${spacingUnit}`;
  }
  return value;
};

export default spacing;
