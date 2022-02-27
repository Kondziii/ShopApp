import React, { Children } from 'react';
import { useRouter } from 'next/router';

interface useSelectedLinkProps {
  element: React.ReactElement;
  pathName: string;
  activeClassName: string;
}

export const useSelectedLink = ({
  element,
  pathName,
  activeClassName,
}: useSelectedLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(element);
  const childClassName = child.props.className;

  const className =
    asPath === pathName
      ? `${childClassName} ${activeClassName}`
      : childClassName;

  return {
    child,
    className,
  };
};
