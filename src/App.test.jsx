import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application overview', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /innovbot cloud overview/i }),
  ).toBeInTheDocument();
});
