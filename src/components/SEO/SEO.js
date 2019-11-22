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
  pathname: PropTypes.string,
  image: PropTypes.string,
};

const defaultProps = {
  lang: 'vi',
  title: '',
  description: '',
  isArticle: false,
  keywords: [],
  pathname: '',
  image: '',
};

function SEO({
  lang,
  title,
  description,
  keywords,
  isArticle,
  pathname,
  image,
}) {
  const metadata = useSiteMetadata();
  const { siteUrl, defaultImage } = metadata;
  const siteTitle = title || metadata.title;
  const metaDescription = description || metadata.description;
  const metaKeywords = keywords.length > 0 ? keywords : metadata.keywords;
  const metaUrl = `${metadata.siteUrl}${pathname || '/'}`;
  const metaImage = `${siteUrl}${image || defaultImage}`;
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
          name: 'image',
          content: metaImage,
        },
        {
          name: 'og:url',
          content: metaUrl,
        },
        {
          name: 'og:title',
          content: siteTitle,
        },
        {
          name: 'og:image',
          content: metaImage,
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
