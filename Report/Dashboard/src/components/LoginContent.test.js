import { customRender, screen } from './test-utils'; // Use your custom render function
import React from 'react';
import LoginContent from './LoginContent';

test('Render login form for logged out user', () => {
  customRender(<LoginContent />);

  // Check for the login button
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

  // Check for the login heading
  expect(screen.getByText('Login', { selector: 'h2' })).toBeInTheDocument();

  // Check for input fields
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});