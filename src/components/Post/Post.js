import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { CatButton } from '@components/Button';
import kebabCase from '@utils/kebabCase';

import './style/Post.scss';

const propTypes = {
  featuredImage: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  sapo: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['big-row', 'small-row', 'column']).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
};

const defaultProps = {
  tags: [],
};

function Post({
  featuredImage,
  title,
  sapo,
  type,
  tags,
  slug,
}) {
  const cls = classNames('blog_style1', {
    small: type === 'column',
    column: type === 'column',
    'small-row': type === 'small-row',
    'big-row': type === 'big-row',
  });

  return (
    <article className={cls}>
      <div className="blog-img">
        <Link
          to={`${slug}`}
          aria-label={`${slug}`}
        >
          <Img fluid={featuredImage} />
        </Link>
      </div>
      <div className="blog_text">
        <div className="blog_text_inner">
          <div className="cat">
            {
              tags.map((tag) => {
                const tagValue = `${kebabCase(tag)}`;
                return (
                  <Link to={`/tags/${tagValue}`} key={tagValue}>
                    <CatButton text={tag} />
                  </Link>
                );
              })
            }
          </div>
          <Link to={`${slug}`}>
            <h4>{title}</h4>
          </Link>
          <p className="sapo">{sapo}</p>
        </div>
      </div>
    </article>
  );
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
