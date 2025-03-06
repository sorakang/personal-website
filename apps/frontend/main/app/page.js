'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTitle } from '../../packages/components/TitleContext.jsx';
// import { getData } from '../utils/api.js';

export default function Home() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle('');
  }, []);

  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  console.log('data', data);

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
      <p>API Message: {JSON.stringify(data)}</p>
    </div>
  );
}
