import { Header } from './Header';
import { Footer } from './Footer';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-stretch min-h-screen '>
      <DefaultSeo {...SEO} />
      <Header />
      <main className='relative flex flex-col flex-grow w-full h-full mx-auto max-w-7xl px-2 sm:px-0 min-h-[70vh]'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
