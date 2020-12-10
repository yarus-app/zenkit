import { spacing } from './spacing';

export const cover = (offset = 0) => (props = {}) => {
  const normilizedOffcet = spacing(offset)(props);
  return {
    position: 'absolute',
    top: normilizedOffcet,
    right: normilizedOffcet,
    bottom: normilizedOffcet,
    left: normilizedOffcet,
  };
};
