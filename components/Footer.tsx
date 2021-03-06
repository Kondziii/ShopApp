import Link from 'next/link';
import { PhoneIcon, MailIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

interface FooterLinkProps {
  title: string;
  links: {
    title: string;
    href: string;
    auth?: boolean;
  }[];
}

const footerLinks: FooterLinkProps[] = [
  {
    title: 'Informacje',
    links: [
      {
        title: 'O nas',
        href: '/about',
      },
      {
        title: 'Kontakt',
        href: '/contact',
      },
      {
        title: 'Regulamin',
        href: '/regulations',
      },
      {
        title: 'Polityka prywatności',
        href: '/policy',
      },
    ],
  },
  {
    title: 'Pomoc',
    links: [
      {
        title: 'FAQ',
        href: '/faq',
      },
      {
        title: 'Metody dostawy',
        href: '/delivery',
      },
      {
        title: 'Metody płatności',
        href: '/payments',
      },
      {
        title: 'Zwrot towaru',
        href: '/return',
      },
    ],
  },
  {
    title: 'Twoje konto',
    links: [
      {
        title: 'Twoje zamówienia',
        href: '/orders',
        auth: true,
      },
      {
        title: 'Logowanie',
        href: '/signin',
        auth: false,
      },
      {
        title: 'Rejestracja',
        href: '/signup',
        auth: false,
      },
    ],
  },
];

export const Footer = () => {
  const session = useSession();

  return (
    <footer className='px-8 py-6 pt-12 shadow-md bg-slate-700 shadow-slate-700'>
      <div className='container grid grid-cols-1 mx-auto text-sm text-center sm:text-left sm:grid-cols-2 md:grid-cols-4 max-w-7xl'>
        {footerLinks.map((section) => {
          return (
            <div
              key={section.title}
              className='mx-auto text-white min-w-[175px]'
            >
              <h4 className='font-semibold uppercase sm:text-left'>
                {section.title}
              </h4>
              <ul className='my-4'>
                {section.links.map((item) => {
                  return (
                    <span key={item.title}>
                      {((session.data?.user &&
                        (item.auth === true || item.auth === undefined)) ||
                        (!session.data?.user && item.auth === false) ||
                        item.auth === undefined) && (
                        <Link href={item.href} passHref>
                          <li className='leading-7 cursor-pointer'>
                            <a className='py-1 transition duration-300 border-b border-b-transparent hover:border-b-yellow-500'>
                              {item.title}
                            </a>
                          </li>
                        </Link>
                      )}
                    </span>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className='mx-auto text-center text-white min-w-[175px]'>
          <h4 className='font-semibold uppercase sm:text-left'>Kontakt</h4>
          <ul className='my-4 '>
            <li className='leading-7'>
              <a className='flex items-center justify-center py-1 space-x-3 sm:justify-start '>
                <PhoneIcon className='h-6' />
                <span className='font-semibold tracking-wider'>
                  123 456 789
                </span>
              </a>
            </li>
            <li className='leading-7 '>
              <a
                href='mailTo:stoopki@gmail.com'
                className='flex items-center justify-center py-1 space-x-3 sm:justify-start '
              >
                <MailIcon className='h-6' />
                <span className='font-semibold tracking-wider'>
                  stoopki@gmail.com
                </span>
              </a>
            </li>
          </ul>
          <h4 className='block my-4 text-sm font-semibold uppercase sm:text-left'>
            Dołącz do nas
          </h4>
          <div className='flex justify-center space-x-4 sm:justify-start'>
            <a
              className='transition duration-300 hover:transform hover:-translate-y-1'
              href='https://facebook.com'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                fill='#fff'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 30'
                width='30px'
                height='30px'
              >
                {' '}
                <path d='M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z' />
              </svg>
            </a>
            <a
              className='transition duration-300 hover:transform hover:-translate-y-1'
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                fill='#fff'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 30'
                width='30px'
                height='30px'
              >
                {' '}
                <path d='M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z' />
              </svg>
            </a>
            <a
              className='transition duration-300 hover:transform hover:-translate-y-1'
              href='https://twitter.com'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                fill='#fff'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 30'
                width='30px'
                height='30px'
              >
                {' '}
                <path d='M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z' />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p className='mt-8 text-xs text-center text-gray-100'>
        &copy;2022 Stoopki, wszystkie prawa zastrzeżone.
      </p>
    </footer>
  );
};
