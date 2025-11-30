import { render, screen } from '@testing-library/react';
import App from './App';

// This test verifies if the default React app renders a specific text element.
test('renders learn react link', () => {
  // Render the App component in a virtual DOM environment for testing
  render(<App />);

  // Search for an element that contains the text 
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element exists in the rendered document
  expect(linkElement).toBeInTheDocument();
});
