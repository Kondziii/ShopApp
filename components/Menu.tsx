import { useState, useRef, ReactChild, ReactNode, HTMLAttributes } from 'react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  as: JSX.Element;
  children: ReactNode;
}

export const Menu = ({ as, children, ...props }: MenuProps) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <div {...props} onMouseLeave={() => setOpen(false)}>
      <div ref={ref} className='btn' onMouseOver={() => setOpen(true)}>
        {as}
      </div>

      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onMouseLeave={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        {children}
      </ControlledMenu>
    </div>
  );
};
