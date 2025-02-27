'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTitle } from '../../packages/components/TitleContext.jsx';

export default function Home() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('');
  }, []);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div>
      <div className="construction">
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
      <p>API Message: {message}</p>
    </div>
  );
}
