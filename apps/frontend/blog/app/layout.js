import { Geist, Geist_Mono } from 'next/font/google';
import '../../packages/styles/globals.css';
import { TitleProvider } from '../../packages/components/TitleContext';
import MainLayout from '../../packages/components/MainLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Sora Kang',
  description: 'A Personal Website to Explore',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TitleProvider>
          <MainLayout>{children}</MainLayout>
        </TitleProvider>
      </body>
    </html>
  );
}
