import React from 'react';

import SearchHome from '../Search/SearchHome/SearchHome';
import './index.scss';

const MainSection = () => {
  return (
    <div className="main__section__wrapper">
      <h1>Find the stay that's right for you.</h1>
      <SearchHome />
    </div>
  );
};

export default MainSection;
