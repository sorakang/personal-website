import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Resume() {
  return(
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="title">Sora Kang</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Under Construction</p>
      </main>
      <footer className="row-start-3 flex gap-12 flex-wrap items-center justify-center">
      <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="file icon"
            width={16}
            height={16}
          />
          About
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/house.svg"
            alt="House icon"
            width={16}
            height={16}
          />
          Home
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Blog →
        </Link>
      </footer>
    </div>
  )
}