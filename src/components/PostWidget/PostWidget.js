import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import useRecentPosts from '@hooks/useRecentPosts';

function PostWidget() {
  const posts = useRecentPosts();
  const mapPosts = (post) => {
    const {
      id,
      featuredImage,
      slug,
      title,
      date,
    } = post;
    return (
      <div className="media post_item" key={id}>
        <Img fixed={featuredImage} />
        <div className="media-body">
          <Link to={`${slug}`}>
            <h3>{title}</h3>
          </Link>
          <p>{date}</p>
        </div>
      </div>
    );
  };

  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title">Bài viết gần đây</h3>
      {posts.map(mapPosts)}
    </aside>
  );
}

export default PostWidget;
