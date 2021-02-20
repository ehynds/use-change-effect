import { useEffect, useRef } from 'react';

type ChangeEffectDeps = ReadonlyArray<unknown>;

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    effect();
  }, deps);
};

const usePrevious = (deps: ChangeEffectDeps): ChangeEffectDeps => {
  const prevRef = useRef(deps);
  useEffect(() => {
    prevRef.current = deps;
  }, deps);
  return prevRef.current;
}

export const useChangeEffect = (
  effect: (...prevValue: ChangeEffectDeps) => void,
  deps: ChangeEffectDeps
): void => {
  const prevValue = usePrevious(deps);

  useUpdateEffect(() => {
    effect(...prevValue);
  }, deps);
};