import React from 'react';
import PostWidget from '@components/PostWidget';
import TagWidget from '@components/TagWidget';
import NewsletterWidget from '@components/NewsletterWidget';
import CategoryWidget from '@components/CategoryWidget/CategoryWidget';

import './style/Aside.scss';

function Aside() {
  return (
    <div className="blog_right_sidebar">
      <PostWidget />
      <NewsletterWidget />
      <CategoryWidget />
      <TagWidget />
    </div>
  );
}

export default Aside;
