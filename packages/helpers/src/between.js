import { ZenError } from './utils/error';
import { getValueAndUnit } from './get-value-and-unit';
import { spacing } from './spacing';

export const between = (fromSize, toSize, minScreen, maxScreen) => (
  props = {}
) => {
  const [unitlessFromSize, fromSizeUnit] = getValueAndUnit(
    spacing(fromSize)(props)
  );
  const [unitlessToSize, toSizeUnit] = getValueAndUnit(spacing(toSize)(props));
  const [unitlessMinScreen, minScreenUnit] = getValueAndUnit(minScreen);
  const [unitlessMaxScreen, maxScreenUnit] = getValueAndUnit(maxScreen);

  if (
    typeof unitlessMinScreen !== 'number' ||
    typeof unitlessMaxScreen !== 'number' ||
    !minScreenUnit ||
    !maxScreenUnit ||
    minScreenUnit !== maxScreenUnit
  ) {
    throw new ZenError(
      'minScreen and maxScreen must be provided as stringified numbers with the same units'
    );
  }

  if (
    typeof unitlessFromSize !== 'number' ||
    typeof unitlessToSize !== 'number' ||
    fromSizeUnit !== toSizeUnit
  ) {
    throw new ZenError(
      'fromSize and toSize must be provided as stringified numbers with the same units'
    );
  }

  if (fromSizeUnit !== minScreenUnit || toSizeUnit !== maxScreenUnit) {
    throw new ZenError(
      'fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen'
    );
  }

  const slope =
    (unitlessFromSize - unitlessToSize) /
    (unitlessMinScreen - unitlessMaxScreen);
  const base = unitlessToSize - slope * unitlessMaxScreen;
  return `calc(${base.toFixed(2)}${fromSizeUnit || ''} + ${(
    100 * slope
  ).toFixed(2)}vw)`;
};

export default between;
