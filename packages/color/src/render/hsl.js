function renderHSL(hue, saturation, lightness, alpha) {
  const result = [
    Math.round(hue % 360),
    `${Math.round(saturation * 100)}%`,
    `${Math.round(lightness * 100)}%`,
  ].join(', ');

  if (Number(alpha)) {
    return `hsla(${result}, ${alpha})`;
  }
  return `hsl(${result})`;
}

export default renderHSL;
