import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import HotelPopulerList from './HotelPopulerList';

describe('Simple test', () => {
  it('Check to have headingId', () => {
    render(<HotelPopulerList />);

    expect(screen.getByTestId('headingId')).toBeInTheDocument();
  });
});
