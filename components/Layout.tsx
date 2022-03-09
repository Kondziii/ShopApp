import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen '>
      <Header />
      <main className='container flex-grow p-8 py-12 mx-auto bg-gray-100 max-w-7xl h-full '>
        {children}
      </main>
      <Footer />
    </div>
  );
};
