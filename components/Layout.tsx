import { Header } from './Header';
import { Footer } from './Footer';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-stretch min-h-screen '>
      <DefaultSeo {...SEO} />
      <TopBar />
      <Header />
      <main className='relative flex flex-col flex-grow w-full h-full mx-auto max-w-7xl'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
