/* eslint-disable react/prop-types */
import React from 'react';

import mainImage from '../../assets/images/main.jpg';
import SearchHome from '../Search/SearchHome/SearchHome';
import './index.scss';

const MainSection = ({ handleSearch, options, onSelect }) => {
  return (
    <div className="main__section__wrapper">
      <SearchHome
        handleSearch={handleSearch}
        options={options}
        onSelect={onSelect}
      />

      <div
        style={{ backgroundImage: `url(${mainImage})` }}
        className="main__section__background"
      />
    </div>
  );
};

export default MainSection;
