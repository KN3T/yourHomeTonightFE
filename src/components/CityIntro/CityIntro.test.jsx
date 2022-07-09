import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import CityIntro from './CityIntro';

describe('CityIntro test', () => {
  it('CityIntro should be render correctly', () => {
    render(<CityIntro />);

    const homeEle = screen.queryByText(/something/i);

    expect(homeEle).not.toBeInTheDocument();
  });

  it('Check to have test', () => {
    render(<CityIntro />);

    expect(screen.getByText('city.populer_city_title')).toBeInTheDocument();
  });

  it('CityIntro should be have title', () => {
    render(<CityIntro />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
  });
});
