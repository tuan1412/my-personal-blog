import React from 'react';
import PropTypes from 'prop-types';

import './style/PageInfo.scss';

const propTypes = {
  info: PropTypes.string,
};

const defaultProps = {
  info: '',
};

function PageInfo({ info }) {
  return (
    <div className="page_info">
      <h3 className="title">{info}</h3>
    </div>
  );
}

PageInfo.propTypes = propTypes;
PageInfo.defaultProps = defaultProps;

export default PageInfo;
