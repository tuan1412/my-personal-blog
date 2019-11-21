import React from 'react';
import PropTypes from 'prop-types';

import './style/CatButton.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
};

function CatButton({ text }) {
  return (
    <span className="cat_btn">{text}</span>
  );
}

CatButton.propTypes = propTypes;

export default CatButton;
