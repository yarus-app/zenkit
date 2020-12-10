import { ifProp } from './if-prop';

export const ifNotProp = (test, pass, fail) => ifProp(test, fail, pass);
