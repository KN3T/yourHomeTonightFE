import React from 'react';

import './index.scss';

const Button = (props) => {
  const { text } = props;
  return (
    <button data-testid="role_button" role="button" className="btn__component">
      {text}
    </button>
  );
};

export default Button;
