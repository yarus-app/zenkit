function toHex(value) {
  const hex = Number.parseInt(value, 10).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export default toHex;
