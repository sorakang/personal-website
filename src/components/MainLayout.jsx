'use client';
import '../styles/globals.css';
import { Footer } from './FooterContext';
import { useTitle } from './TitleContext';

export default function MainLayout({ children }) {
  const { title } = useTitle();
  return (
    <div className="grid-container">
      <h1 className="title">{title}</h1>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <Footer title={title} />
      </footer>
    </div>
  );
}
