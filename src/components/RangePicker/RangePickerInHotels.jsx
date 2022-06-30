import { DatePicker } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

const RangePickerInHotels = (props) => {
  const { setDateCheckin, setDateCheckout } = props;
  const onChange = (value, dateString) => {
    setDateCheckin(dateString[0]);
    setDateCheckout(dateString[1]);
  };
  return <RangePicker allowClear onChange={onChange} />;
};

export default RangePickerInHotels;
