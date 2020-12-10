import { theme } from './theme';

export const defaults = {
  xxs: 0,
  xs: 320,
  s: 600,
  m: 960,
  l: 1024,
  xl: 1280,
  xxl: 1920,
};

const getValue = (key) => (props = {}) => {
  const breakpoints = theme('breakpoints', defaults)(props);

  if (Object.keys(breakpoints).includes(key)) {
    return breakpoints[key];
  }

  return key;
};

const getNextValue = (key) => (props = {}) => {
  const breakpoints = theme('breakpoints', defaults)(props);

  if (Object.keys(breakpoints).includes(key)) {
    const breakpoint = breakpoints[key];
    const breakpointValues = Object.values(breakpoints);
    const breakpointIndex = breakpointValues.indexOf(breakpoint);
    if (breakpointIndex === breakpointValues.length - 1) {
      return breakpoint;
    }

    return breakpointValues[breakpointIndex + 1];
  }

  return key;
};

const getMediaQuery = (min, max) => {
  const query = [
    !!min && `(min-width: ${min}px)`,
    !!max && `(max-width: ${max}px)`,
  ]
    .filter(Boolean)
    .join(' and ');

  return `@media ${query}`;
};

export const up = (key) => (props = {}) => {
  const breakpoint = getValue(key)(props);

  return getMediaQuery(breakpoint);
};

export const down = (key) => (props = {}) => {
  const breakpoint = getNextValue(key)(props);

  return getMediaQuery(undefined, breakpoint);
};

export const only = (key) => (props = {}) => {
  const breakpoint = getNextValue(key)(props);
  const nextbreakpoint = getNextValue(key)(props);

  return getMediaQuery(breakpoint, nextbreakpoint);
};

export const between = (min, max) => (props = {}) => {
  const minbreakpoint = getNextValue(min)(props);
  const maxbreakpoint = getNextValue(max)(props);
  return getMediaQuery(minbreakpoint, maxbreakpoint);
};

export const breakpoint = {
  up,
  down,
  only,
  between,
};
