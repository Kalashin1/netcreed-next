import { DocumentData } from 'firebase/firestore'

export type ARTICLE_STATUS = 'published' | 'archived' | 'saved'

export type ARTICLE_ENGAGEMENT = 'views' | 'saves' | 'likes';

export interface User extends DocumentData {
  name: string;
  id: string;
  email: string;
  username: string;
  profilePhoto: string;
  phone: string;
  github: string;
  twitter: string;
  creator: boolean;
  reddit: string;
  linkedin: string;
  headline: string;
  bio: string;
  createdAt: number;
  updatedAt?: number;
  articles: Array<Article>;
  savedArticles: Array<Article>
}

export type Author = Pick<User, 'name' | 'username' | 'phone' | 'email' | 'github' | 'twitter' | 'coverPhoto' | 'id'>;

export interface Article extends DocumentData {
  title: string;
  createdAt: number;
  tags: Array<{ label: string, value: string }>;
  category: string;
  body: string;
  coverPhoto: string;
  slug: string;
  id: string;
  stamp: string;
  readingTimeInMins: number;
  description: string;
  author: Author;
  views: Author[];
  likes: Author[];
  saves: Author[];
  url: string;
  status: ARTICLE_STATUS;
}

export type engagement = {
  user: Author
}

export type LessonRef = Pick<LessonSchema, "id" | "title" | "url" | "slug" | "description">[];

export type CourseSchema = {
  description: string
  id?: string
  slug?: string
  url?: string
  title: string
  photoUrl: string
  status: 'APPROVED' | 'SAVED' | 'REJECTED'
  lessons: LessonRef | []
  createdAt: number
  updatedAt?: number
}

export type LessonSchema = {
  id?: string
  title: string
  slug?: string
  description: string
  course: Pick<CourseSchema, "id" | "title" | "description" | "slug" | "url">
  createdAt: number
  status: 'APPROVED' | 'SAVED' | 'REJECTED'
  updatedAt?: number
  courseContent: string
  url?: string
}