import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { describe } from 'vitest';

import UserControl from './UserControl';

const userData = {
  email: 'user@gg.com',
  fullName: 'Võ Người Dùng',
  id: 3,
  phone: '0944112233',
  role: 'ROLE_HOTEL',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTczNTU2MDIsImV4cCI6MTY1Nzk2MDQwMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBnZy5jb20ifQ.qIWH5vMCTkYfRnlYSf5FsGK3R85hn2b5rmuLYD8ilAHszpoOZbE8mZNRD3u3fOS9RYdl2LkStk926lCeaVBU88UEgArT74LIpT0wnkdLWnFP3Ep8bZAibie5SM49NhjrR_tbn-lqySLdCqywmvLe8vwI1VVXWlbsJY8PMy-IWq75382SIwjX5Jgzgk15cKGOgFv0GzJLnhTJPndyNeLIr_rsP9SvJt3btkqwvRAwQZe6MRqQRsTgUQhHy2qBJUabNfYYMSkBVULDcL_Xx84SgwSEnBx_rxZ1Nntj-WfZ7H0vrUPcLmBqABdwZP3Vzg8F7IFYiLRawFkUaHucsEPVUw',
};

describe('User Control', () => {
  it('Should return a select option', () => {
    const userControl = render(
      <HashRouter>
        <UserControl
          onLogOut={() => console.log('user control text')}
          userData={userData}
        />
      </HashRouter>
    );
    expect(userControl).toMatchSnapshot();
  });

  it('should render button my hotel', () => {
    const component = screen.queryByTestId('btn__myhotel');
    expect(component).toMatchSnapshot();
  });
});
