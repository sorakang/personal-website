import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-2">
          <Image
            aria-hidden
            src="/traffic.svg"
            alt="Traffic Cone icon"
            width={30}
            height={30}
          />
          <p className="title">
            Under Construction
          </p>
        </div>
        <p>Please come back soon!</p>
      </main>
      <footer className="row-start-3 flex gap-12 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/resume"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Resume
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
  );
}
