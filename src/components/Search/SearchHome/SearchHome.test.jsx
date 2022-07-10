import { render } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { describe } from 'vitest';

import SearchHome from './SearchHome';

describe('SearchHome component', () => {
  it('should render a search bar', () => {
    const date = [moment('07-09-2022'), moment(moment('07-12-2022'))];
    const searchBar = render(
      <HashRouter>
        <SearchHome
          visible={false}
          date={date}
          options={[
            { city: 'Da Nang', count_hotel: 1 },
            { city: 'Da Lat', count_hotel: 1 },
          ]}
          childrenData="1"
          adults="1"
          cityName="Da Nang"
          loading={false}
          handleVisibleChange={() => console.log(1)}
          onFinish={() => console.log('On finish')}
          handleSearch={() => console.log('search debounce')}
          onSelect={() => console.log('selected')}
          setAdults={() => console.log('adult = 1')}
          setChildren={() => console.log('children = 1')}
          setCityName={() => console.log('city = da nang')}
          DATE_FORMAT="DD-MM-YYYY"
          setDate={() => console.log('date = 1')}
        />
      </HashRouter>
    );
    expect(searchBar).toMatchSnapshot();
  });
});
