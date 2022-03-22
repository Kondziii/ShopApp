interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      className='h-5 text-2xl transition duration-300 hover:text-gray-800 sm:hidden'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </button>
  );
};
