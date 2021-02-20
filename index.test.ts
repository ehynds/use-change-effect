import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useChangeEffect } from './index';

it('doesn\'t call the effect on mount', () => {
  const effect = jest.fn();

  renderHook(() => {
    const [value, setValue] = useState('foo');
    useChangeEffect(effect, [value]);
  });

  expect(effect).not.toHaveBeenCalled();
});

it('tracks a single value', () => {
  const effect = jest.fn();

  const { result } = renderHook(() => {
    const [value, setValue] = useState('foo');
    useChangeEffect(effect, [value]);
    return { setValue };
  });

  act(() => result.current.setValue('bar'));
  expect(effect).toHaveBeenCalledTimes(1);
  expect(effect).toHaveBeenCalledWith('foo');

  act(() => result.current.setValue('baz'));
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenNthCalledWith(1, 'foo');
  expect(effect).toHaveBeenNthCalledWith(2, 'bar');
});

it('tracks multiple values', () => {
  const effect = jest.fn();

  const { result } = renderHook(() => {
    const [value1, setValue1] = useState('foo');
    const [value2, setValue2] = useState('foo');
    useChangeEffect(effect, [value1, value2]);
    return { setValue1, setValue2 };
  });

  act(() => result.current.setValue1('bar'));
  expect(effect).toHaveBeenCalledTimes(1);
  expect(effect).toHaveBeenCalledWith('foo', 'foo');

  act(() => result.current.setValue2('bar'));
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenNthCalledWith(2, 'bar', 'foo');

  act(() => {
    result.current.setValue1('baz');
    result.current.setValue2('baz');
  });
  expect(effect).toHaveBeenCalledTimes(3);
  expect(effect).toHaveBeenNthCalledWith(3, 'bar', 'bar');
});

it('handles undefined initial values', () => {
  const effect = jest.fn();

  const { result } = renderHook(() => {
    const [value, setValue] = useState<string>();
    useChangeEffect(effect, [value]);
    return { setValue };
  });

  act(() => result.current.setValue('bar'));
  expect(effect).toHaveBeenCalledTimes(1);
  expect(effect).toHaveBeenCalledWith(undefined);
});