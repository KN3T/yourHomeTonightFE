import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import SiderNav from './SiderNav';

describe('Sider navigation test', () => {
  it('should render correctly', () => {
    const SiderNavEl = render(
      <HashRouter>
        <SiderNav />
      </HashRouter>
    );
    expect(SiderNavEl).toMatchSnapshot();
  });
});
