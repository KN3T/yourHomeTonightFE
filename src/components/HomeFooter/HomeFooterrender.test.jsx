import { render, screen } from '@testing-library/react';

import HomeFooter from './HomeFooter';

test('HomeFooter should render', () => {
  render(<HomeFooter />);
  expect(screen.getByText('©2022 Yourhome29.')).toBeInTheDocument();
});
