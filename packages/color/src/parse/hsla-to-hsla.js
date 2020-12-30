const hslaRegex = /^hsla\(\s*(\d{0,3}\.?\d+)\s*,\s*(\d{1,3}\.?\d?)%\s*,\s*(\d{1,3}\.?\d?)%\s*,\s*([+-]?\d*\.?\d+)\s*\)$/i;

function parseHslaToHsla(color) {
  const hslaMatched = hslaRegex.exec(color);

  return (
    hslaMatched && {
      hue: Math.abs(Number.parseInt(`${hslaMatched[1]}`, 10) % 360),
      saturation: Number.parseInt(`${hslaMatched[2]}`, 10) / 100,
      lightness: Number.parseInt(`${hslaMatched[3]}`, 10) / 100,
      alpha: Number.parseFloat(`${hslaMatched[4]}`),
    }
  );
}

export default parseHslaToHsla;
