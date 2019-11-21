import { useStaticQuery, graphql } from 'gatsby';

const useCategories = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      {
        allMarkdownRemark {
          group(field: frontmatter___categories) {
            fieldValue
            totalCount
          }
        }
      }
    `,
  );
  return allMarkdownRemark.group;
};

export default useCategories;
