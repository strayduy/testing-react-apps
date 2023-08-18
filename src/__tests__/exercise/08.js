// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  act(result.current.increment);
  expect(result.current.count).toBe(1);
  act(result.current.increment);
  expect(result.current.count).toBe(2);
  act(result.current.decrement);
  expect(result.current.count).toBe(1);
  act(result.current.decrement);
  expect(result.current.count).toBe(0);
})

test('allows customization of the initial count', () => {
  const { result } = renderHook(() => useCounter({ initialCount: 25 }));

  expect(result.current.count).toBe(25);
  act(result.current.increment);
  expect(result.current.count).toBe(26);
  act(result.current.increment);
  expect(result.current.count).toBe(27);
  act(result.current.decrement);
  expect(result.current.count).toBe(26);
  act(result.current.decrement);
  expect(result.current.count).toBe(25);
})

test('allows customization of the step', () => {
  const { result } = renderHook(() => useCounter({ step: 3 }));

  expect(result.current.count).toBe(0);
  act(result.current.increment);
  expect(result.current.count).toBe(3);
  act(result.current.increment);
  expect(result.current.count).toBe(6);
  act(result.current.decrement);
  expect(result.current.count).toBe(3);
  act(result.current.decrement);
  expect(result.current.count).toBe(0);
})

/* eslint no-unused-vars:0 */
