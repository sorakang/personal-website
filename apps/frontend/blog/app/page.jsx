'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useTitle } from '../../packages/components/TitleContext.jsx';
import getPosts from '../api/getPosts.js';
import Post from '../../packages/components/Post.jsx';

export default function Blog() {
  const { setTitle } = useTitle();
  const [ postData, setData ] = useState([]);
  useEffect(() => {
    setTitle('My Blog');
    async function loadData() {
      const data = await getPosts();
      setData(data);
    }
    loadData();
  }, []);
  
  console.log('postData', postData);

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Post posts={postData} />
      </Suspense>
    </div>
  );
}
