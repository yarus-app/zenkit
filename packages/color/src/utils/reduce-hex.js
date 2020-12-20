function reduceHex(value) {
  if (
    value.length === 7 &&
    value[1] === value[2] &&
    value[3] === value[4] &&
    value[5] === value[6]
  ) {
    return `#${[value[1], value[3], value[5]].join('')}`;
  }

  if (
    value.length === 9 &&
    value[1] === value[2] &&
    value[3] === value[4] &&
    value[5] === value[6] &&
    value[7] === value[8]
  ) {
    return `#${[value[1], value[3], value[5], value[7]].join('')}`;
  }

  return value;
}

export default reduceHex;
