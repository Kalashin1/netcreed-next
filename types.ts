import { DocumentData } from 'firebase/firestore'

export type ARTICLE_STATUS = 'published' | 'archived' | 'saved'

export interface User extends DocumentData {
  name: string;
  id: string;
  email: string;
  username: string;
  profilePhoto: string;
  phone: string;
  github: string;
  twitter: string;
  reddit: string;
  linkedin: string;
  headline: string;
  bio: string;
  createdAt: number;
  updatedAt: number;
  articles: Array<Article>;
  savedArticles: Array<Article>
}

export type Author = Pick<User, 'name' | 'username' | 'phone' | 'email' | 'github' | 'twitter' | 'coverPhoto' | 'id'>;

export interface Article extends DocumentData {
  title: string;
  createdAt: number;
  tags: Array<string>;
  category: string;
  body: string;
  coverPhoto: string;
  slug: string;
  id: string;
  stamp: string;
  readingTimeInMins: number;
  description: string;
  author: Author;
  views: number;
  likes: number;
  saves: number;
  url: string;
  status: ARTICLE_STATUS;
}

