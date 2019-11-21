import React from 'react';
import { Link } from 'gatsby';
import useCategories from '@hooks/useCategories';
import kebabCase from '@utils/kebabCase';

import './style/CategoryWidget.scss';

function CategoryWidget() {
  const categories = useCategories();
  const mapCategory = (category) => (
    <li key={`${kebabCase(category.fieldValue)}`}>
      <Link to={`/categories/${kebabCase(category.fieldValue)}`}>
        <p>{category.fieldValue}</p>
        <p>{category.totalCount}</p>
      </Link>
    </li>
  );
  return (
    <aside className="single_sidebar_widget post_category_widget">
      <h4 className="widget_title">Chuyên mục</h4>
      <ul className="list cat-list">
        {categories.map(mapCategory)}
      </ul>
    </aside>
  );
}

export default CategoryWidget;
