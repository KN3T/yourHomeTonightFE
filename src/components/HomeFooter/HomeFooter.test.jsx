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

  it('HomeFooter should be have 2 select', () => {
    render(<HomeFooter />);

    expect(screen.getAllByRole('combobox')).toHaveLength(2);
  });
});
