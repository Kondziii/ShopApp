import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useSelectedLink } from '../hooks/useSelectedLink';

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName?: string;
}

export const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { child, className } = useSelectedLink({
    element: children,
    pathName: props.href.toString() || props.as?.toString() || '',
    activeClassName: activeClassName || '',
  });

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};
