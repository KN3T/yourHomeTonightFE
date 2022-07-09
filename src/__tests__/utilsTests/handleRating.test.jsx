import { Tag } from 'antd';

import handleRating from '../../utils/handleRating';

test('handle rating testing', () => {
  expect(handleRating(4.5)).toEqual(<Tag color="success">Excellent</Tag>);

  expect(handleRating(4)).toEqual(<Tag color="cyan">Very good</Tag>);

  expect(handleRating(3.5)).toEqual(<Tag color="geekblue">Good</Tag>);

  expect(handleRating(2)).toEqual(<Tag color="magenta">Nice</Tag>);
});
