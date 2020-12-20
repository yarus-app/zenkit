function convertHslToRgb(hue, saturation, lightness) {
  if (saturation === 0) {
    // achromatic
    return {
      red: Math.round(lightness * 100) / 100,
      green: Math.round(lightness * 100) / 100,
      blue: Math.round(lightness * 100) / 100,
    };
  }

  // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV
  const huePrime = (((hue % 360) + 360) % 360) / 60;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const middle = chroma * (1 - Math.abs((huePrime % 2) - 1));

  const [red, green, blue] = [
    [chroma, middle, 0],
    [middle, chroma, 0],
    [0, chroma, middle],
    [0, middle, chroma],
    [middle, 0, chroma],
    [chroma, 0, middle],
  ][Math.trunc(huePrime)];

  const lightnessModification = lightness - chroma / 2;

  return {
    red: red + lightnessModification,
    green: green + lightnessModification,
    blue: blue + lightnessModification,
  };
}

export default convertHslToRgb;
