import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import type { MarkdownResult } from '../types';

const CustomMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) return <a {...props}></a>;

          if (
            process.env.NEXT_PUBLIC_DOMAIN?.split('/').at(2) !==
            href.split('/').at(2)
          )
            return <a {...props} rel='noopener noreferrer'></a>;

          return (
            <Link href={href}>
              <a {...props}>{href}</a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};

export default CustomMarkdown;
