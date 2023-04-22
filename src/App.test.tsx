import { render, screen } from '@testing-library/react';
import App from './App';

test('render app', () => {
  render(<App />);
  const element = screen.getByText(/Drag & Drop/i);
  expect(element).toBeInTheDocument();
});
