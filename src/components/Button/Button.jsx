import React from 'react';

import './index.scss';

const Button = (props) => {
  const { text } = props;
  return <button className="btn__component">{text}</button>;
};

export default Button;
