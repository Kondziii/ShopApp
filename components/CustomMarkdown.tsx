import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import type { MarkdownResult } from '../types';
import Image from 'next/image';

const CustomMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) return <a {...props}></a>;

          if (
            process.env.NEXT_PUBLIC_DOMAIN?.split('/')[2] !==
            href.toString().split('/')[2]
          )
            return <a {...props} rel='noopener noreferrer'></a>;

          return (
            <Link href={href}>
              <a {...props}>{href}</a>
            </Link>
          );
        },
        img: ({ src, alt, width, height }) => {
          return (
            <div className='w-1/2 mx-auto'>
              <Image
                className='block mx-auto'
                src={src!}
                alt={alt}
                width={1}
                height={1}
                layout='responsive'
                objectFit='cover'
              />
            </div>
          );
        },
      }}
    ></MDXRemote>
  );
};

export default CustomMarkdown;
