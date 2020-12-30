function guard(lower, upper, value) {
  return Math.max(lower, Math.min(upper, value));
}

export default guard;
