import { render } from '@testing-library/react';

import CityCard from './CityCard';

test('city card', () => {
  const component = render(<CityCard />);
  expect(component).toMatchSnapshot();
});
