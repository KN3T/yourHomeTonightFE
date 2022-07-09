/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';

import SearchHome from '../Search/SearchHome/SearchHome';
import './index.scss';

const MainSection = (props) => {
  const {
    visible,
    date,
    options,
    childrenData,
    adults,
    cityName,
    loading,
    handleVisibleChange,
    onFinish,
    handleSearch,
    onSelect,
    setAdults,
    setChildren,
    setCityName,
    DATE_FORMAT,
    setDate,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="main__section__wrapper ctn">
      <h1>{t('main.slogan')}</h1>
      <SearchHome
        visible={visible}
        date={date}
        options={options}
        childrenData={childrenData}
        adults={adults}
        cityName={cityName}
        loading={loading}
        handleVisibleChange={handleVisibleChange}
        onFinish={onFinish}
        handleSearch={handleSearch}
        onSelect={onSelect}
        setAdults={setAdults}
        setChildren={setChildren}
        setCityName={setCityName}
        DATE_FORMAT={DATE_FORMAT}
        setDate={setDate}
      />
    </div>
  );
};

export default MainSection;
