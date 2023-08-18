// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let result;

  function TestComponent() {
    result = useCounter()
    return null;
  }

  render(<TestComponent />);

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

/* eslint no-unused-vars:0 */
