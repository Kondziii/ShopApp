export const Footer = () => {
  return (
    <footer className='py-6 shadow-md bg-slate-700 shadow-slate-700'>
      <p className='text-center text-gray-100'>
        &copy;Konrad Chojnacki, the first edition of{' '}
        <a
          className='text-yellow-400 hover:text-yellow-500'
          href='https://zaisteprogramuj.pl/'
          target='_blank'
          rel='noreferrer'
        >
          zaiste course
        </a>
        .
      </p>
    </footer>
  );
};
