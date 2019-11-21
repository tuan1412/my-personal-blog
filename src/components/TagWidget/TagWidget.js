import React from 'react';
import useTags from '@hooks/useTags';
import Tag from '@components/Tag/Tag';

function TagWidget() {
  const tags = useTags();

  return (
    <aside className="single_sidebar_widget tag_cloud_widget">
      <h4 className="widget_title">Tag</h4>
      <div className="list">
        {tags.map((tag) => <Tag key={tag.fieldValue} fieldValue={tag.fieldValue} />)}
      </div>
    </aside>
  );
}

export default TagWidget;
