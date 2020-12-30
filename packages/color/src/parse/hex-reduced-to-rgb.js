/* eslint-disable unicorn/no-reduce */
const reducedHexRegex = /^#[\dA-Fa-f]{3}$/;

function hexReducedToRgb(color) {
  return (
    reducedHexRegex.test() &&
    ['red', 'green', 'blue'].reduce((acc, curr, i) => {
      const index = i + 1;

      acc[curr] = Number.parseInt(`${color[index]}${color[index]}`, 16) / 255;
      return acc;
    }, {})
  );
}

export default hexReducedToRgb;
