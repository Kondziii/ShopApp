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

          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};

export default CustomMarkdown;
