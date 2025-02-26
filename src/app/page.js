'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTitle } from '../components/TitleContext.jsx';

export default function Home() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('');
  }, []);
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          aria-hidden
          src="/traffic.svg"
          alt="Traffic Cone icon"
          width={30}
          height={30}
        />
        <p className="title">Under Construction</p>
      </div>
      <p>Please come back soon!</p>
    </div>
  );
}
