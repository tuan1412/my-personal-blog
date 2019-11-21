import { useStaticQuery, graphql } from 'gatsby';

const useRecentPosts = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark (
          sort: {order: DESC, fields: frontmatter___date}
          limit: 4
        ) {
          edges {
            node {
              frontmatter {
                featuredImage {
                  childImageSharp {
                    fixed(width: 100, height: 60) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                title
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
    `,
  );

  const posts = allMarkdownRemark.edges.map(({ node }) => {
    const { id, fields, frontmatter } = node;
    const {
      featuredImage,
      title,
      date,
    } = frontmatter;
    return {
      id,
      title,
      date,
      slug: fields.slug,
      featuredImage: featuredImage.childImageSharp.fixed,
    };
  });
  return posts;
};

export default useRecentPosts;
