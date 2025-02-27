'use client';
import React, { useEffect } from 'react';
import { useTitle } from '../../packages/components/TitleContext.jsx';

export default function Blog() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('My Blog');
  }, []);

  return (
    <div>
      <p>Under Construction</p>
    </div>
  );
}
