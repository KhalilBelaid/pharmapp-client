import React from 'react';
import { render, screen } from '@testing-library/react';
import Queue from './components/Queue';

test('renders learn react link', () => {
  render(<Queue />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
