import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from '@utils/kebabCase';

import './style/Tag.scss';

const propTypes = {
  fieldValue: PropTypes.string.isRequired,
};

function Tag({ fieldValue }) {
  const urlTag = `/tags/${kebabCase(fieldValue)}`;
  return (
    <span className="tag">
      <Link to={urlTag}>
        {fieldValue}
      </Link>
    </span>
  );
}

Tag.propTypes = propTypes;

export default Tag;
