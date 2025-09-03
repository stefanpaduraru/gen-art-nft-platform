import R from 'ramda';

type Predicate = (...args: any[]) => boolean

/**
 * Returns true if value is undefined
 */
const isUndefined: Predicate = value => typeof value === 'undefined';

/**
 * Takes a predicate and returns a function
 * which is a negation of predicate
 */
const negate = (predicate: Predicate) => (...args: any[]) => !predicate(...args);

/**
 * Takes a function and returns the new one
 * ensuring that the promise is returned
 */
const fnReturnPromise = (fn: (...args: any[]) => any) => (...args: any[]) =>
  Promise.resolve(fn(...args));

/**
 * Same as Ramda.pipeP but ensures that
 * the promise is returned from each function
 */
const pipeP = (...fns: ((...args: any[]) => any)[]) => {
  if (!fns.length) {
    throw new Error('At least one function should be sent to pipeP');
  }

  // Prevent from type error in TS about spread operator
  return R.pipeP.apply(null, (fns as any).map(fnReturnPromise));
};

export const RamdaIntegration = {
  ...R,
  negate,
  fnReturnPromise,
  pipeP,
  isNotEmpty: negate(R.isEmpty),
  isNotNil: negate(R.isNil),
  isNotNaN: negate(Number.isNaN),
  isUndefined,
  isNotUndefined: negate(isUndefined),
};
