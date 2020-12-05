import { getValueAndUnit } from './get-value-and-unit';

export const ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4,
};

const getRatio = (ratioName) => {
  if (typeof ratioName === 'number') {
    return ratioName;
  }

  if (typeof ratio === 'string') {
    if (!ratioNames[ratio]) {
      throw new ZenError(43);
    }

    return ratioNames[ratioName];
  }

  throw new ZenError(43);
};

export const modularScale = (steps, base = '1em', ratio = 'perfectFourth') => {
  if (typeof steps !== 'number') {
    throw new ZenError(42);
  }

  const [realBase, unit] =
    typeof base === 'string' ? getValueAndUnit(base) : [base, ''];
  const realRatio = getRatio(ratio);

  return `${realBase * realRatio ** steps}${unit || ''}`;
};

export default modularScale;
