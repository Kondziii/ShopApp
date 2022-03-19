import { Header } from './Header';
import { Footer } from './Footer';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen '>
      <DefaultSeo {...SEO} />
      <Header />
      <main className='container flex-grow h-full p-8 py-12 mx-auto bg-gray-100 max-w-7xl '>
        {children}
      </main>
      <Footer />
    </div>
  );
};
