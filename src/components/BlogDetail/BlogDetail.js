/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Tag from '@components/Tag/Tag';

import './style/BlogDetail.scss';

const propTypes = {
  post: PropTypes.object.isRequired,
};

function BlogDetail({ post }) {
  const {
    content,
    featuredImage,
    title,
    tags,
  } = post;
  return (
    <div className="main_blog_details">
      <Img fluid={featuredImage} />
      <h1 className="title_blog">{title}</h1>
      <div className="tag_wrapper">
        {tags.map((tag) => <Tag key={tag} fieldValue={tag} />)}
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

BlogDetail.propTypes = propTypes;

export default BlogDetail;
