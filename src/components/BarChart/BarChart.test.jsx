import { render } from '@testing-library/react';

import BarChart from './BarChart';

const datasets = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 82.5, 0, 0, 0, 0, 0],
      label: 'Revenue',
    },
  ],
};

describe('Bar chart testing', () => {
  it('should render correctly', () => {
    const component = render(<BarChart datasets={datasets} />);
    expect(component).toMatchSnapshot();
  });
});
