import Image from 'next/image';
import Link from 'next/link';

export function Footer({ title }) {
  return (
    <>
      {title !== 'My Blog' ? (
        <>
          <Link className="link" href="/">
            <Image
              aria-hidden
              src="/house.svg"
              alt="house icon"
              width={16}
              height={16}
            />
          </Link>
          <Link className="link" href="/about">
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            About
          </Link>
          <Link className="link" href="/resume">
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
            className="link"
            href="/?subdomain=blog"
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
        </>
      ) : (
        <>
          <Link className="link" href="/?subdomain=blog">
            <Image
              aria-hidden
              src="/house.svg"
              alt="house icon"
              width={16}
              height={16}
            />
          </Link>
          <Link
            className="link"
            href="/"
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
            Sora →
          </Link>
        </>
      )}
    </>
  );
}
