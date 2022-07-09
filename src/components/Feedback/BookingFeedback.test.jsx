import { render } from '@testing-library/react';

import BookingFeedback from './BookingFeedback';

describe('booking feedback testing', () => {
  it('should render correctly', () => {
    const component = render(<BookingFeedback id={1} status={true} />);
    expect(component).toMatchSnapshot();
  });
});
