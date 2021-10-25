import { render, screen } from '@testing-library/react';

import App from './App';

test('renders the page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/GenerateScriptsForSample/i);
  expect(linkElement).toBeInTheDocument();
});
