/* eslint-disable import/no-named-as-default */

import prop from './prop';

const theme = (path, defaultValue) => (properties) =>
  prop(path, defaultValue)(properties.theme);

export default theme;
