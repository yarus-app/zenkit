class ColorError extends Error {
  constructor(message) {
    super(`ColorError: ${message}`);
  }
}

export default ColorError;
