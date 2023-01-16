import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders sales by producers link', () => {
  render(<App />);
  const titleElement = screen.getByText(/Sales by Producers/i);
  expect(titleElement).toBeInTheDocument();
});
