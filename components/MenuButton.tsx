interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      className='h-5 text-2xl transition duration-300 hover:text-gray-800 sm:hidden'
      onClick={onClick}
    >
      menu
    </button>
  );
};
