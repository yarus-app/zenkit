const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([+-]?\d*\.?\d+)\s*\)$/i;

function parseRgbaToRgba(color) {
  const rgbaMatched = rgbaRegex.exec(color);

  return (
    rgbaMatched && {
      red: Number.parseInt(`${rgbaMatched[1]}`, 10) / 255,
      green: Number.parseInt(`${rgbaMatched[2]}`, 10) / 255,
      blue: Number.parseInt(`${rgbaMatched[3]}`, 10) / 255,
      alpha: Number.parseFloat(`${rgbaMatched[4]}`),
    }
  );
}

export default parseRgbaToRgba;
