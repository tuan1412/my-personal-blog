import React from 'react';
import Paginate from 'react-paginate';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './style/Pagination.scss';

const propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}) {
  const previousLabel = (
    <span className="page-link">
      <FontAwesomeIcon icon={faChevronLeft} />
    </span>
  );
  const nextLabel = (
    <span className="page-link">
      <FontAwesomeIcon icon={faChevronRight} />
    </span>
  );
  const initialPage = currentPage - 1;

  return (
    <Paginate
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      previousClassName="page-item previous"
      nextClassName="page-item next"
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      disableInitialCallback
      pageCount={pageCount}
      initialPage={initialPage}
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      onPageChange={onPageChange}
    />
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
