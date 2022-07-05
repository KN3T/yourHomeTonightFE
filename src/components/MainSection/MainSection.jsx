import React from 'react';
import { useTranslation } from 'react-i18next';

import SearchHome from '../Search/SearchHome/SearchHome';
import './index.scss';

const MainSection = () => {
  const { t } = useTranslation();

  return (
    <div className="main__section__wrapper ctn">
      <h1>{t('main.slogan')}</h1>
      <SearchHome />
    </div>
  );
};

export default MainSection;
