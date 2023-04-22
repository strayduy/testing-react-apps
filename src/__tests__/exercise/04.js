// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker';
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const { username, password } = buildLoginForm({ password: 'abc' });
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submit = screen.getByRole('button', { name: /submit/i });

  await userEvent.type(usernameInput, username);
  await userEvent.type(passwordInput, password);
  await userEvent.click(submit);

  expect(handleSubmit).toHaveBeenCalledWith({
      username,
      password: 'abc',
  });
})

function buildLoginForm(overrides) {
    const {
        username: usernameOverride,
        password: passwordOverride,
    } = overrides ?? {};

    return {
        username: usernameOverride || faker.internet.userName(),
        password: passwordOverride || faker.internet.password(),
    };
}


/*
eslint
  no-unused-vars: "off",
*/
