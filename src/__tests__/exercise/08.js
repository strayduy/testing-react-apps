// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(props) {
  let result = {};

  function TestComponent() {
    Object.assign(result, useCounter(props))
    return null;
  }

  render(<TestComponent />);
  return result;
}

test('exposes the count and increment/decrement functions', async () => {
  const result = setup();

  expect(result.count).toBe(0);
  await act(result.increment);
  expect(result.count).toBe(1);
  await act(result.increment);
  expect(result.count).toBe(2);
  await act(result.decrement);
  expect(result.count).toBe(1);
  await act(result.decrement);
  expect(result.count).toBe(0);
})

test('allows customization of the initial count', async () => {
  const result = setup({ initialCount: 25 });

  expect(result.count).toBe(25);
  await act(result.increment);
  expect(result.count).toBe(26);
  await act(result.increment);
  expect(result.count).toBe(27);
  await act(result.decrement);
  expect(result.count).toBe(26);
  await act(result.decrement);
  expect(result.count).toBe(25);
})

test('allows customization of the step', async () => {
  const result = setup({ step: 3 });

  expect(result.count).toBe(0);
  await act(result.increment);
  expect(result.count).toBe(3);
  await act(result.increment);
  expect(result.count).toBe(6);
  await act(result.decrement);
  expect(result.count).toBe(3);
  await act(result.decrement);
  expect(result.count).toBe(0);
})

/* eslint no-unused-vars:0 */
