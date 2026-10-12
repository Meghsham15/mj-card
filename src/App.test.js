import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Meghsham Jade digital card', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /meghsham jade/i })).toBeInTheDocument();
  expect(screen.getByText(/full stack & ai developer/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add to contacts/i })).toBeInTheDocument();
});
