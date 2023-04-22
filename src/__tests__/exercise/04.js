// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot';
import Login from '../../components/login'

const loginFormBuilder = build({
    fields: {
        username: fake(f => f.internet.userName()),
        password: fake(f => f.internet.password()),
    },
});

test('submitting the form calls onSubmit with username and password', async () => {
  const { username, password } = loginFormBuilder();
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
      password,
  });
})

/*
eslint
  no-unused-vars: "off",
*/
