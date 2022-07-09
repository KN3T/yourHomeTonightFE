import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

  test('HotelAdmin should render', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HotelAdmin />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText('admin.add_room')).toBeInTheDocument();
  });
});
