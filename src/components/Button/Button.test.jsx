import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { waitFor } from '../../utils/test-utils';
import Button from './Button';

describe('Button test', () => {
  it('Button should be render correctly', () => {
    render(<Button text={'Create'} />);
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('Button should be clickable', async () => {
    render(<Button />);
    waitFor(() => expect(screen.getAllByTestId('role_button')).click());
  });
});
