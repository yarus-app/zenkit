import ColorError from '../utils/error';
import convertRgbToHsl from '../convert/rgb-to-hsl';
import parseHexToRgb from './hex-to-rgb';
import parseHexaToRgba from './hexa-to-rgba';
import parseReducedHexToRgb from './hex-reduced-to-rgb';
import parseReducedHexaToRgba from './hexa-reduced-to-rgba';
import parseRgbToRgb from './rgb-to-rgb';
import parseRgbaToRgba from './rgba-to-rgba';
import parseHslToHsl from './hsl-to-hsl';
import parseHslaToHsla from './hsla-to-hsla';

export default (color) => {
  const hsl = parseHslToHsl(color) || parseHslaToHsla(color);
  if (hsl) {
    return hsl;
  }

  const rgb =
    parseHexToRgb(color) ||
    parseHexaToRgba(color) ||
    parseReducedHexToRgb(color) ||
    parseReducedHexaToRgba(color) ||
    parseRgbToRgb(color) ||
    parseRgbaToRgba(color);

  if (rgb) {
    return convertRgbToHsl(rgb);
  }

  throw new ColorError(5);
};
