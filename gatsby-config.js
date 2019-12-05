const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Tuan Nguyen',
    description: 'Chia sẻ kiến thức về lập trình, cuộc sống. Chủ đề thường là Javascript, React, phát triển bản thân,...',
    author: 'Tuan Nguyen',
    keywords: ['React', 'Front-end', 'Javascript', 'blog'],
    image: '/images/logo-192x192.png',
    socialLinks: {
      facebook: 'https://www.facebook.com/ninhxa14',
      github: 'https://github.com/tuan1412',
      email: 'tuannguyenanh1412@gmail.com',
    },
    url: 'https://imtuan.me',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': path.resolve(__dirname, './src/components'),
          '@styles': path.resolve(__dirname, './src/styles'),
          '@hooks': path.resolve(__dirname, './src/hooks'),
          '@utils': path.resolve(__dirname, './src/utils'),
        },
        extensions: [
          '.sass',
          '.scss',
          '.js',
          '.json',
          '.jsx',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts/`,
        name: 'post',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
          {
            resolve: 'gatsby-remark-classes',
            options: {
              classMap: {
                h1: 'title header',
                h2: 'header',
                h3: 'header',
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'imtuan.me',
        short_name: 'imtuan',
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#FFF',
        display: 'standalone',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
  ],
};
