export class ZenError extends Error {
  constructor(code, ...args) {
    super(`An error occurred.`);
  }
}

export default ZenError;
