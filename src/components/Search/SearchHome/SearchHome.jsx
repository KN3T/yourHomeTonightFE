import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

const SearchHome = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="search__home__wrapper">
      <form action="">
        <input
          className="search__home__wrapper__input"
          placeholder={t('main.search_your_perfect_place_to_stay')}
          type="text"
        />
      </form>
    </div>
  );
};

export default SearchHome;
