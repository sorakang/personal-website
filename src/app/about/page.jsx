'use client';
import React, { useEffect } from 'react';
import { useTitle } from '../../components/TitleContext.jsx';

export default function About() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('About Me');
  }, []);

  return (
    <div>
      <p>Under Construction</p>
    </div>
  );
}
