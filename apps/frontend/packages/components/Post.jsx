import React, { Suspense } from 'react';

const Post = ({ posts }) => {
  // TODO: iterate through posts
  console.log('posts', posts);
  return (
    <div className="posts">
      <Suspense fallback={<p>Loading...</p>}>
        {posts.map(x => (
          <div className="post" key={x.key}>
            <h4>{x.name}</h4>
            <p>{x.company}</p>
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default Post;
