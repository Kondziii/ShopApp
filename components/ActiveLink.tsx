import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useSelectedLink } from '../hooks/useSelectedLink';

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName?: string;
  exact?: boolean;
}

export const ActiveLink = ({
  children,
  activeClassName,
  exact = true,
  ...props
}: ActiveLinkProps) => {
  const { child, className } = useSelectedLink({
    element: children,
    pathName: props.href.toString() || props.as?.toString() || '',
    activeClassName: activeClassName || '',
    exact,
  });

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};
