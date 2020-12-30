import ifProp from './if-prop';

const ifNotProp = (test, pass, fail) => ifProp(test, fail, pass);

export default ifNotProp;
