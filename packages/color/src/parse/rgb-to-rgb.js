const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;

function parseRgbToRgb(color) {
  const rgbMatched = rgbRegex.exec(color);

  return (
    rgbMatched && {
      red: Number.parseInt(`${rgbMatched[1]}`, 10) / 255,
      green: Number.parseInt(`${rgbMatched[2]}`, 10) / 255,
      blue: Number.parseInt(`${rgbMatched[3]}`, 10) / 255,
    }
  );
}

export default parseRgbToRgb;
