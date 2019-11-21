import { useStaticQuery, graphql } from 'gatsby';

const useTags = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      {
        allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `,
  );

  const allTags = allMarkdownRemark.group;
  const commonTags = allTags
    .sort((tag, otherTag) => tag.totalCount - otherTag.totalCount)
    .slice(0, 12);
  return commonTags;
};

export default useTags;
