const hslRegex = /^hsl\(\s*(\d{0,3}\.?\d+)\s*,\s*(\d{1,3}\.?\d?)%\s*,\s*(\d{1,3}\.?\d?)%\s*\)$/i;

function parseHslToHsl(color) {
  const hslMatched = hslRegex.exec(color);

  return (
    hslMatched && {
      hue: Math.abs(Number.parseInt(`${hslMatched[1]}`, 10) % 360),
      saturation: Number.parseInt(`${hslMatched[2]}`, 10) / 100,
      lightness: Number.parseInt(`${hslMatched[3]}`, 10) / 100,
    }
  );
}

export default parseHslToHsl;
