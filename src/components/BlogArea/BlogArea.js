import React from 'react';
import PropTypes from 'prop-types';
import Post from '@components/Post';

import './style/BlogArea.scss';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  posts: [],
};

function BlogArea({ posts }) {
  function renderPosts() {
    return posts.map((post, index) => {
      let type = 'column';
      if (index === 0 || (index === posts.length - 1 && index % 2 === 1)) {
        type = 'big-row';
      }
      return (
        <Post
          key={post.id}
          type={type}
          featuredImage={post.featuredImage}
          title={post.title}
          sapo={post.sapo}
          tags={post.tags}
          slug={post.slug}
        />
      );
    });
  }

  return (
    <div className="blog_left_sidebar">
      {renderPosts()}
    </div>
  );
}

BlogArea.propTypes = propTypes;
BlogArea.defaultProps = defaultProps;

export default BlogArea;
