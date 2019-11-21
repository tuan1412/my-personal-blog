const path = require('path');
const kebabCase = require('./utils/kebabCase');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogListTemplate = path.resolve('src/templates/BlogList.js');
  const blogPostTemplate = path.resolve('src/templates/DetailBlog.js');
  const tagTemplate = path.resolve('src/templates/BlogListByTag.js');
  const categoryTemplate = path.resolve('src/templates/BlogListByCategory.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      },
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  // handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // create post pagination list pages
  const posts = result.data.postsRemark.edges;
  const postsPerPage = 4;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/page/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(({ fieldValue, totalCount }) => {
    const postsByTagPerPage = 4;
    const numPagesPostByTag = Math.ceil(totalCount / postsByTagPerPage);
    Array.from({ length: numPagesPostByTag }).forEach((_, i) => {
      const baseUrl = `/tags/${kebabCase(fieldValue)}`;
      createPage({
        path: i === 0 ? baseUrl : `${baseUrl}/page/${i + 1}`,
        component: tagTemplate,
        context: {
          tag: fieldValue,
          tagValue: `${kebabCase(fieldValue)}`,
          limit: postsByTagPerPage,
          skip: i * postsByTagPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
  // Extract categories data from query
  const categories = result.data.categoriesGroup.group;
  // Make categories pages
  categories.forEach(({ fieldValue, totalCount }) => {
    const postsByCategoryPerPage = 4;
    const numPagesPostByCategory = Math.ceil(totalCount / postsByCategoryPerPage);
    Array.from({ length: numPagesPostByCategory }).forEach((_, i) => {
      const baseUrl = `/categories/${kebabCase(fieldValue)}`;
      createPage({
        path: i === 0 ? baseUrl : `${baseUrl}/page/${i + 1}`,
        component: categoryTemplate,
        context: {
          category: fieldValue,
          categoryValue: `${kebabCase(fieldValue)}`,
          limit: postsByCategoryPerPage,
          skip: i * numPagesPostByCategory,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark' && typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent);
    createNodeField({
      node,
      name: 'slug',
      value: fileNode.fields.slug,
    });
  }
};
