import { DocumentData } from 'firebase/firestore'

export type ARTICLE_STATUS = 'published' | 'archived' | 'saved'

export interface User extends DocumentData {
  name: string;
  id: string;
  email: string;
  username: string;
  phone: string;
  github: string;
  twitter: string;
  headline: string;
  bio: string;
  createdAt: number;
  updatedAt: number;
  articles: Array<Article>;
  savedArticles: Array<Article>
}

export interface Article extends DocumentData {
  title: string;
  createdAt: number;
  tags: Array<string>;
  category: string;
  body: string;
  image: string;
  slug: string;
  id: string;
  stamp: string;
  readingTimeInMins: number;
  description: string;
  author: Partial<User>;
  views: number;
  likes: number;
  saves: number;
  url: string;
  status: ARTICLE_STATUS;
}

