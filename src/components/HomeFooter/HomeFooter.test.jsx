import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import HomeFooter from './HomeFooter';

describe('HomeFooter test', () => {
  it('HomeFooter should be render correctly', () => {
    render(<HomeFooter />);

    const homeEle = screen.queryByText(/something/i);

    expect(homeEle).not.toBeInTheDocument();
  });

  it('HomeFooter should be have 1 select', () => {
    render(<HomeFooter />);

    expect(screen.getAllByRole('combobox')).toHaveLength(1);
  });

  test('HomeFooter should render', () => {
    render(<HomeFooter />);
    expect(screen.getByText('©2022 Yourhome29.')).toBeInTheDocument();
  });
  test('HomeFooter should render', () => {
    render(<HomeFooter />);
    expect(screen.getByText('footer.about')).toBeInTheDocument();
  });
});
