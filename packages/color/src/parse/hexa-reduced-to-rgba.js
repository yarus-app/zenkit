/* eslint-disable unicorn/no-reduce */
const reducedHexaRegex = /^#[\dA-Fa-f]{4}$/;

function hexaReducedToRgba(color) {
  return (
    reducedHexaRegex.test() &&
    ['red', 'green', 'blue', 'alpha'].reduce((acc, curr, i) => {
      const index = i + 1;

      acc[curr] = Number.parseInt(`${color[index]}${color[index]}`, 16) / 255;
      return acc;
    }, {})
  );
}

export default hexaReducedToRgba;
