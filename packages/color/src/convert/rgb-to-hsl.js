function convertRgbToHsl(red, green, blue) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  const lightness = Math.round(((max + min) / 2) * 100) / 100;

  if (max === min) {
    // achromatic
    return {
      hue: 0,
      saturation: 0,
      lightness,
    };
  }

  const delta = max - min;

  const saturation =
    Math.round(
      (lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)) * 100
    ) / 100;

  let hue;
  switch (max) {
    case red:
      hue = (green < blue ? 6 : 0) + (green - blue) / delta;
      break;
    case green:
      hue = 2 + (blue - red) / delta;
      break;
    case blue:
    default:
      hue = 4 + (red - green) / delta;
      break;
  }
  hue = Math.abs(Math.round(hue * 60) % 360);

  return {
    hue,
    saturation,
    lightness,
  };
}

export default convertRgbToHsl;
