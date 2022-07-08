import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import HotelAdmin from './HotelAdmin';

const MockHotelAdmin = () => {
  return (
    <BrowserRouter>
      <HotelAdmin />
    </BrowserRouter>
  );
};

describe('HotelAdmin test', () => {
  it('HotelAdmin should be render correctly', () => {
    render(<MockHotelAdmin />);

    const homeEle = screen.queryByText(/something/i);

    expect(homeEle).not.toBeInTheDocument();
  });

  it('HotelAdmin should have a search-input', () => {
    render(<MockHotelAdmin />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('HotelAdmin should have a room-table', () => {
    render(<MockHotelAdmin />);

    expect(screen.getByTestId('room-table')).toBeInTheDocument();
  });
});
