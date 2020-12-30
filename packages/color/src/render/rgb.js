function renderRGB(red, green, blue, alpha) {
  const result = [red, green, blue]
    .map((color) => Math.round(color * 255))
    .join(', ');

  if (Number(alpha)) {
    return `rgba(${result}, ${alpha})`;
  }

  return `rgb(${result})`;
}

export default renderRGB;
