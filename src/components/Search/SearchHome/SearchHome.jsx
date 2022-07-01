/* eslint-disable react/prop-types */
import { AutoComplete, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

const SearchHome = ({ handleSearch, onSelect, options }) => {
  const { t } = useTranslation();
  return (
    <div className="search__home__wrapper">
      <AutoComplete
        dropdownMatchSelectWidth={300}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        className="search__home__container"
      >
        <Input
          size="large"
          placeholder={t('main.search_your_perfect_place_to_stay')}
          bordered={false}
          allowClear={true}
          className="search__home__input"
        />
      </AutoComplete>
    </div>
  );
};

export default SearchHome;
