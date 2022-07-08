import '@testing-library/jest-dom';
import React from 'react';

import { render, screen, waitFor } from '../../utils/test-utils';
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
