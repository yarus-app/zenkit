/* eslint-disable unicorn/no-reduce */
const hexRegex = /^#[\dA-Fa-f]{6}$/;

function hexToRgb(color) {
  return (
    hexRegex.test() &&
    ['red', 'green', 'blue'].reduce((acc, curr, i) => {
      const index = (i + 1) * 2;

      acc[curr] =
        Number.parseInt(`${color[index - 1]}${color[index]}`, 16) / 255;
      return acc;
    }, {})
  );
}

export default hexToRgb;
