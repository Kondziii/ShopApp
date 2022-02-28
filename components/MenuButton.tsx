import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon
        className='text-2xl transition duration-300 hover:text-gray-800 sm:hidden'
        icon={faBars}
      />
    </button>
  );
};
