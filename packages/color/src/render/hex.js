import toHex from '../utils/to-hex';
import reduceHex from '../utils/reduce-hex';

function renderHex(red, green, blue, alpha) {
  return reduceHex(
    `#${[red, green, blue, alpha]
      .filter((color) => Number(color))
      .map((color) => toHex(Math.round(color * 255)))
      .join('')}`
  );
}

export default renderHex;
