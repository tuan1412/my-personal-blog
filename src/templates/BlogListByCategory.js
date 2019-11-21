import React from 'react';
import Layout from '@components/Layout';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Aside from '@components/Aside';
import BlogArea from '@components/BlogArea';
import Pagination from '@components/Pagination';
import PageInfo from '@components/PageInfo';
import SEO from '@components/SEO';

const propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

function BlogListByCategory({ data, pageContext }) {
  const { allMarkdownRemark } = data;
  const {
    numPages,
    currentPage,
    categoryValue,
    category,
  } = pageContext;
  const posts = allMarkdownRemark.edges.map(({ node }) => {
    const { id, frontmatter, fields } = node;
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
    const baseUrl = `/categories/${categoryValue}`;
    navigate(selected === 0 ? baseUrl : `${baseUrl}/page/${selected + 1}`);
  };

  return (
    <Layout>
      <SEO />
      <section className="blog_area p_120">
        <Container>
          <Row>
            <Col lg="8">
              <PageInfo info={`Category: ${category}`} />
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

BlogListByCategory.propTypes = propTypes;

export const blogListByTagQuery = graphql`
      query ($skip: Int!, $limit: Int!, $category: String!) {
        allMarkdownRemark (
          filter: { frontmatter: { categories: { in: [$category] } } }
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

export default BlogListByCategory;
