/* eslint-disable import/no-named-as-default */

import { prop } from './prop';

export const switchProp = (needle, cases, defaultCase) => (properties = {}) => {
  const value =
    typeof needle === 'function'
      ? needle(properties)
      : prop(needle)(properties);
  const finalCases = typeof cases === 'function' ? cases(properties) : cases;
  if (value in finalCases) {
    return finalCases[value];
  }
  return defaultCase;
};

export default switchProp;
