import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import useSiteMetadata from '@hooks/useSiteMetadata';

const propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isArticle: PropTypes.bool,
  keywords: PropTypes.array,
};

const defaultProps = {
  lang: 'vi',
  title: '',
  description: '',
  isArticle: false,
  keywords: [],
};

function SEO({
  lang,
  title,
  description,
  keywords,
  isArticle,
}) {
  const metadata = useSiteMetadata();
  const siteTitle = title || metadata.title;
  const metaDescription = description || metadata.description;
  const metaKeywords = keywords.length > 0 ? keywords : metadata.keywords;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={siteTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'og:title',
          content: siteTitle,
        },
        {
          name: 'og:type',
          content: isArticle ? 'article' : 'website',
        },
        {
          name: 'og:description',
          content: metaDescription,
        },
      ]
        .concat(
          metaKeywords.length > 0 ? [{
            name: 'keywords',
            content: metaKeywords.join(', '),
          }] : [],
        )}
    />
  );
}

SEO.propTypes = propTypes;
SEO.defaultProps = defaultProps;

export default SEO;
