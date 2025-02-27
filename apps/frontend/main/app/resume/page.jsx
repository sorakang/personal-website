'use client';
import React, { useEffect } from 'react';
import { useTitle } from '../../../packages/components/TitleContext';

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
