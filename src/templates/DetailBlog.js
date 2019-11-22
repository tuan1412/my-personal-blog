import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Layout from '@components/Layout';
import Aside from '@components/Aside';
import BlogDetail from '@components/BlogDetail';
import SEO from '@components/SEO';

const propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

function DetailBlog({ data, pageContext }) {
  const { slug } = pageContext;
  const { markdownRemark } = data;
  const { html: content, frontmatter } = markdownRemark;
  const {
    featuredImage,
    title,
    sapo,
    tags,
    date,
    ...rest
  } = frontmatter;
  const post = {
    content,
    title,
    tags,
    date,
    slug,
    featuredImage: featuredImage.childImageSharp.fluid,
    ...rest,
  };
  return (
    <Layout>
      <SEO
        title={title}
        description={sapo}
        keywords={tags}
        publishedTime={date}
        modifiedTime={date}
        pathname={slug}
        image={featuredImage.childImageSharp.fluid.src}
        isArticle
      />
      <section className="blog_area p_120 single-post-area">
        <Container>
          <Row>
            <Col lg="8">
              <BlogDetail post={post} />
            </Col>
            <Col lg="4">
              <Aside />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

DetailBlog.propTypes = propTypes;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sapo
        title
        tags
        categories
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;

export default DetailBlog;
