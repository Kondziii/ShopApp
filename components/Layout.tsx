import { Header } from './Header';
import { Footer } from './Footer';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import { useUserState } from './UserContext';
import { CookiePopUp } from './CookiePopUp';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const userState = useUserState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative flex flex-col items-stretch min-h-screen '>
      <DefaultSeo
        {...SEO}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <Header />
      <main className='relative flex flex-col flex-grow w-full h-full mx-auto max-w-7xl px-2 sm:px-0 min-h-[70vh]'>
        {children}
      </main>
      <Footer />
      {isVisible && <CookiePopUp />}
    </div>
  );
};
