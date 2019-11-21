import React from 'react';
import PropTypes from 'prop-types';

import './style/BlogButton.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
};

function BlogButton({ text }) {
  return (
    <span className="blog_btn">{text}</span>
  );
}

BlogButton.propTypes = propTypes;

export default BlogButton;
