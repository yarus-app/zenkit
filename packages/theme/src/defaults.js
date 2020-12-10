export const breakpoints = {
  xxs: 0,
  xs: 320,
  s: 600,
  m: 960,
  l: 1024,
  xl: 1280,
  xxl: 1920,
};

export const palette = {
  common: {
    blue: 'rgb(  0, 122, 255)',
    brown: 'rgb(162, 162, 162)',
    gray: 'rgb(162, 162, 162)',
    green: 'rgb(162, 162, 162)',
    indigo: 'rgb(162, 162, 162)',
    orange: 'rgb(162, 162, 162)',
    pink: 'rgb(162, 162, 162)',
    purple: 'rgb(175,  82, 222)',
    red: 'rgb(255,  59,  48)',
    teal: 'rgb( 90, 200, 250)',
    yellow: 'rgb(255, 204,   0)',
  },
  text: {
    primary: 'rgba(000, 000, 000, 0.87)',
    secondary: 'rgba(000, 000, 000, 0.87)',
    disabled: 'rgba(000, 000, 000, 0.87)',
    hint: 'rgba(000, 000, 000, 0.87)',
  },
  background: {
    paper: '#fff',
    default: '#fafafa',
  },
};

export const theme = () => ({
  palette,
  breakpoints,
});
