/* eslint-disable unicorn/no-reduce */
const hexaRegex = /^#[\dA-Fa-f]{8}$/;

function hexaToRgba(color) {
  return (
    hexaRegex.test() &&
    ['red', 'green', 'blue', 'alpha'].reduce((acc, curr, i) => {
      const index = (i + 1) * 2;

      acc[curr] =
        Number.parseInt(`${color[index - 1]}${color[index]}`, 16) / 255;
      return acc;
    }, {})
  );
}

export default hexaToRgba;
