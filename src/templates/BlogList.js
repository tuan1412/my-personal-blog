import React from 'react';
import { graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '@components/Layout';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Aside from '@components/Aside';
import BlogArea from '@components/BlogArea';
import Pagination from '@components/Pagination';
import SEO from '@components/SEO';

const propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

function BlogList({ data, pageContext }) {
  const { numPages, currentPage } = pageContext;
  const { allMarkdownRemark } = data;
  const posts = allMarkdownRemark.edges.map(({ node }) => {
    const { id, fields, frontmatter } = node;
    const {
      featuredImage,
      title,
      sapo,
      tags,
      categories,
      date,
    } = frontmatter;

    return {
      id,
      title,
      sapo,
      tags,
      categories,
      date,
      slug: fields.slug,
      featuredImage: featuredImage.childImageSharp.fluid,
    };
  });

  const onPageChange = ({ selected }) => {
    navigate(selected === 0 ? '/' : `/page/${selected + 1}`);
  };

  return (
    <Layout>
      <SEO />
      <section className="blog_area">
        <Container>
          <Row>
            <Col lg="8">
              <BlogArea posts={posts} />
              <div className="blog-pagination justify-content-center d-flex">
                <Pagination
                  pageCount={numPages}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              </div>
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

BlogList.propTypes = propTypes;

export const blogListQuery = graphql`
      query ($skip: Int!, $limit: Int!) {
        allMarkdownRemark (
          sort: {order: DESC, fields: frontmatter___date}
          limit: $limit
          skip: $skip
        ) {
          edges {
            node {
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
              fields {
                slug
              }
              id
            }
          }
        }
      }
    `;

export default BlogList;
