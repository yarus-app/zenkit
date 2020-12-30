/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */

import prop from './prop';

const parseFunction = (props, test) => Boolean(test(props));

const parseObject = (props, test) => {
  const keys = Object.keys(test);
  const { length } = keys;

  for (let index = 0; index < length; index += 1) {
    const key = keys[index];
    const expected = test[key];
    const value = prop(key)(props);
    if (expected !== value) {
      return false;
    }
  }

  return true;
};

const parseString = (props, test) => Boolean(prop(test)(props));

const parseMap = {
  function: parseFunction,
  object: parseObject,
  string: parseString,
};

const ifProp = (test, pass, fail = '') => (props = {}) => {
  let result = true;

  if (Array.isArray(test)) {
    const { length } = test;
    let index = 0;
    while (result && index < length) {
      result = parseMap[typeof test[index]](props, test[index]);
      index += 1;
    }
  } else {
    result = parseMap[typeof test](props, test);
  }

  const value = result ? pass : fail;
  return typeof value === 'function' ? value(props) : value;
};

export default ifProp;
