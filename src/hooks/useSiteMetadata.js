import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            author
            description
            keywords
            socialLinks {
              email
              facebook
              github
            }
            title
            image
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
