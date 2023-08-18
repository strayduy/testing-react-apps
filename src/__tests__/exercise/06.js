// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation');

test('displays a loading spinner if the position is unavailable', async () => {
  useCurrentPosition.mockImplementation(() => {
    return [null];
  });

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
})

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {latitude: 11, longitude: 22},
  }

  useCurrentPosition.mockImplementation(() => {
    return [fakePosition];
  });

  render(<Location />)

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText('Latitude: 11')).toBeInTheDocument()
  expect(screen.getByText('Longitude: 22')).toBeInTheDocument()
})

test('displays an error message if we cannot get the users current location', async () => {
  useCurrentPosition.mockImplementation(() => {
    return [, new Error('test error')];
  });

  render(<Location />)

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent('test error')
})

/*
eslint
  no-unused-vars: "off",
*/
