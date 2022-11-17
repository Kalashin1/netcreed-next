import { DocumentData } from 'firebase/firestore';

export type ARTICLE_STATUS = 'published' | 'archived' | 'saved';

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
  dev: string;
  linkedin: string;
  headline: string;
  bio: string;
  createdAt: number;
  updatedAt?: number;
  followers: Author[];
  following: Author[];
  articles: Array<Article>;
  savedArticles: Array<Article>;
}

export type Author = Pick<
  User,
  | 'name'
  | 'username'
  | 'phone'
  | 'email'
  | 'github'
  | 'twitter'
  | 'coverPhoto'
  | 'id'
>;

export interface Article extends DocumentData {
  title: string;
  createdAt: number;
  tags: Array<{ label: string; value: string }>;
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
  user: Author;
};

export type LessonRef = Pick<LessonSchema, 'id' | 'url' | 'slug'>[];

export interface CourseSchema extends DocumentData {
  description: string;
  id?: string;
  slug?: string;
  url?: string;
  title: string;
  photoUrl: string;
  status: 'APPROVED' | 'SAVED' | 'REJECTED';
  lessons: LessonRef | [];
  createdAt: number;
  updatedAt?: number;
}

export type CourseRef = Pick<CourseSchema, 'id' | 'slug' | 'url'>;

export interface LessonSchema extends DocumentData {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  course: CourseRef;
  createdAt: number;
  courseId: string;
  status: 'APPROVED' | 'SAVED' | 'REJECTED';
  updatedAt?: number;
  courseContent: string;
  url?: string;
}

export type NOTIFICATION_TYPE = 'FOLLOW' | 'COMMENT' | 'LIKE';

export interface NotificiationSchema extends DocumentData {
  id?: string;
  userId: string;
  type: NOTIFICATION_TYPE;
  body: string;
  head: string;
  createdAt: number;
  isRead: boolean;
}

export interface UserProfile extends Author {
  bio: string;
  creator: boolean;
}
