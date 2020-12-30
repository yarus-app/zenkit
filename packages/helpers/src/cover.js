import spacing from './spacing';

const cover = (offset = 0) => (props = {}) => {
  const normilizedOffcet = spacing(offset)(props);
  return {
    position: 'absolute',
    top: normilizedOffcet,
    right: normilizedOffcet,
    bottom: normilizedOffcet,
    left: normilizedOffcet,
  };
};

export default cover;
