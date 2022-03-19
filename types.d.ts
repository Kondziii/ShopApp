import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ApiProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
}

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;
