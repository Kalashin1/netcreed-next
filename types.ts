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
  blocked?: Author[];
  articles?: Array<ArticleRef>;
  savedArticles?: Array<ArticleRef>;
  registeredCourses?: StudentCourseRef[];
  createdCourses?: CourseRef[];
}

export type USER_ENGAGEMENT_ACTION_TYPE = 'FOLLOW' | 'BLOCK';

export type USER_ENGAGEMENT_TYPE = 'FOLLOWERS' | 'FOLLOWING';

export type UserEngagements = {
  id: string;
  followers: Author[];
  following: Author[];
};

export type Comment = {
  owner: UserProfile;
  ownerId: string;
  article: ArticleRef;
  articleId: string;
  likes: Author[];
  createdAt: number;
  updatedAt?: number;
  body: string;
  id: string;
  parentComment?: string;
  childComments?: Comment[];
};

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
  comments: Comment[];
}

export type CreateCommentPayload = {
  articleId: string;
  body: string;
  owner: UserProfile;
  parentCommentId?: string;
};

export type ArticleRef = Pick<
  Article,
  'id' | 'url' | 'slug' | 'coverPhoto' | 'title' | 'description'
>;

export type engagement = {
  user: Author;
};

export type LessonRef = Pick<LessonSchema, 'id' | 'url' | 'slug'>;

export interface CourseSchema extends DocumentData {
  description: string;
  id?: string;
  slug?: string;
  url?: string;
  title: string;
  photoUrl: string;
  status: 'APPROVED' | 'SAVED' | 'REJECTED';
  lessons: LessonRef[] | [];
  creator?: Author;
  createdAt: number;
  isPaid?: boolean;
  price?: number;
  updatedAt?: number;
  questions?: QuestionSchema[];
  isCertified?: boolean;
  registeredUsers?: string[];
}

export type CourseRef = Pick<CourseSchema, 'id' | 'slug' | 'url'>;
export type StudentCourseRef = Partial<
  CourseRef & { currentLesson?: LessonRef }
>;
export type ADD_QUESTION_TYPE = 'LESSON' | 'COURSE';

export interface LessonSchema extends DocumentData {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  course: CourseRef;
  createdAt: number;
  lessonPosition?: number;
  courseId: string;
  status: 'APPROVED' | 'SAVED' | 'REJECTED';
  updatedAt?: number;
  courseContent: string;
  url?: string;
  video?: string;
  questions?: QuestionSchema[];
}

export type NOTIFICATION_TYPE = 'FOLLOW' | 'COMMENT' | 'LIKE';

export type QuestionSchema = {
  id: string;
  question: string;
  options: Option[];
  correctAnswer: Option;
  marks: number;
  answers?: Answer[];
  required: boolean;
  maxAttempts: number
};

export type AnswerQuestionType = {
  option: Option; 
  lessonId: string;
  userId: string;
  questionId: string;
}

export type Answer = {
  userId: string;
  answer: Option
  date: number;
} 

export type Option = {
  answer: string;
  id: string
  isCorrect?: boolean;
}

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
