import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('renders the TechNest brand in the navbar', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<App />);

  expect(await screen.findByText(/technest/i)).toBeInTheDocument();
});
