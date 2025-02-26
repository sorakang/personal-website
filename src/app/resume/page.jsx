'use client';
import React, { useEffect } from 'react';
import { useTitle } from '../../components/TitleContext.jsx';

export default function Resume() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('Resume');
  }, []);

  return (
    <div>
      <p>Under Construction</p>
    </div>
  );
}
