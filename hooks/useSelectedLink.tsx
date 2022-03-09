import React, { Children } from 'react';
import { useRouter } from 'next/router';

interface useSelectedLinkProps {
  element: React.ReactElement;
  pathName: string;
  activeClassName: string;
  exact?: boolean;
}

export const useSelectedLink = ({
  element,
  pathName,
  activeClassName,
  exact,
}: useSelectedLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(element);
  const childClassName = child.props.className;
  let className: string;

  if (exact) {
    className =
      asPath === pathName
        ? `${childClassName} ${activeClassName}`
        : childClassName;
  } else {
    className = asPath.includes(pathName)
      ? `${childClassName} ${activeClassName}`
      : childClassName;
  }

  return {
    child,
    className,
  };
};
