/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Tag from '@components/Tag/Tag';
import { DiscussionEmbed } from 'disqus-react';

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
    slug,
  } = post;
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  };
  return (
    <div className="main_blog_details">
      <Img fluid={featuredImage} />
      <h1 className="title_blog">{title}</h1>
      <div className="tag_wrapper">
        {tags.map((tag) => <Tag key={tag} fieldValue={tag} />)}
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <DiscussionEmbed {...disqusConfig} />
    </div>
  );
}

BlogDetail.propTypes = propTypes;

export default BlogDetail;
