import { randomBytes } from 'crypto';
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  where,
  orderBy,
  deleteDoc,
} from '@firebase/firestore';
import { db, auth } from './Firebase-settings';
import { User as AuthUser } from '@firebase/auth';
import { storage } from './Firebase-settings';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { Dispatch, FormEvent, MutableRefObject, SetStateAction } from 'react';
import {
  Article,
  ARTICLE_STATUS,
  CourseSchema,
  User,
  Author,
  LessonSchema,
  CourseRef,
  ARTICLE_ENGAGEMENT,
  NOTIFICATION_TYPE,
  NotificiationSchema,
  UserProfile as _UserProfile,
  ArticleRef,
  CreateCommentPayload,
} from './types';
import { NextRouter } from 'next/router';
import { getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  UserProfile,
} from 'firebase/auth';
import slugify from 'slugify';
import { Comment } from './types';

export const uploadImage = async (file: HTMLInputElement, folder: string) => {
  const extension = file.files![0].name.split('.')[1];

  const key = randomBytes(16).toString('hex');
  const name = `${key}.${extension}`;
  localStorage.setItem('name', name);

  const storageRef = ref(storage);
  const articleImagesRef = ref(storageRef, `${folder}/${name}`);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const res = await uploadBytes(articleImagesRef, file.files![0], metadata);

  const imageUrl = await getDownloadURL(articleImagesRef);

  return imageUrl;
};

export const baseDomain = `https://blog.thenetcreed.com`;

export const tags = [
  { label: 'JavaScript', value: 'js' },
  { label: 'HTML', value: 'html' },
  { label: 'C#', value: 'c#' },
  { label: 'Java', value: 'java' },
  { label: 'CSS', value: 'css' },
  { label: 'NodeJS', value: 'node' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'python' },
  { label: 'React', value: 'react' },
  { label: 'React Native', value: 'react-native' },
  { label: 'Firebase', value: 'firebase' },
  { label: 'Firestore', value: 'firestore' },
  { label: 'Angular', value: 'angular' },
  { label: 'Go', value: 'go' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solidity', value: 'solidity' },
  { label: 'AWS', value: 'aws' },
  { label: 'GCP', value: 'gcp' },
  { label: 'MongoDB', value: 'mongodb' },
  { label: 'SQL', value: 'sql' },
  { label: 'Dart', value: 'dart' },
  { label: 'Flutter', value: 'flutter' },
];

export const categories = [
  { label: 'Programming', value: 'coding' },
  { label: 'UI/UX', value: 'ui/ux' },
  { label: 'Digital Marketing', value: 'digiMarketing' },
  { label: 'Game Development', value: 'gameDev' },
];

interface EditArticlePayload {
  title: string;
  body: string;
  selectedTags: typeof tags;
  selectedCategory: string;
}

export const updateArticle = async (
  e: FormEvent<HTMLFormElement>,
  staus: ARTICLE_STATUS,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  coverPhoto: MutableRefObject<null | HTMLInputElement>,
  article: Article,
  { title, body, selectedTags, selectedCategory }: EditArticlePayload,
  router: NextRouter
) => {
  setShowSpinner(true);
  try {
    e.preventDefault();

    let imageUrl;

    const photo = coverPhoto.current!;

    if (photo.files![0]) {
      imageUrl = await uploadImage(photo, 'articles');
    } else {
      imageUrl = article.coverPhoto;
    }

    console.log(imageUrl);
    const slug = slugify(article?.title!, {
      lower: true,
    });

    const articleUpdate: Partial<Article> = {
      title: title,
      body: body,
      description: body.slice(0, 200),
      updatedAt: new Date().getTime(),
      coverPhoto: imageUrl,
      tags: selectedTags,
      category: selectedCategory,
      status: staus!,
      url: `post/${article.id}`,
      slug: `post/${slug}`,
    };
    await updateDoc(doc(db, 'articles', article.id), articleUpdate);
    setShowSpinner(true);
    alert('Article Edited');
    router.push('/user/posts');
  } catch (error) {
    setShowSpinner(true);
    console.log(error);
  }
};

export const getUser = async (user: AuthUser): Promise<Author> => {
  const uid = user.uid;
  const docRef = doc(db, 'users', uid);
  const document = await getDoc(docRef);
  const userDoc = (await document.data()) as User;
  return {
    username: userDoc.username,
    phone: userDoc.phone,
    name: userDoc.name,
    twitter: userDoc.twitter,
    github: userDoc.github,
    coverPhoto: userDoc.profilePhoto,
    email: userDoc.email,
    id: document.id,
  };
};

export const getProfile = async (userId: string): Promise<_UserProfile> => {
  const docRef = await doc(db, 'users', userId);
  const document = await getDoc(docRef);
  const userDoc = (await document.data()) as User;
  return {
    username: userDoc.username,
    phone: userDoc.phone,
    name: userDoc.name,
    twitter: userDoc.twitter,
    github: userDoc.github,
    coverPhoto: userDoc.profilePhoto,
    email: userDoc.email,
    id: document.id,
    bio: userDoc.bio,
    creator: userDoc.creator,
  };
};

export const createCourseFormHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  router: NextRouter
) => {
  setShowSpinner(true);
  try {
    e.preventDefault();

    const { title, coverPhoto, description } = form;

    const imageUrl = await uploadImage(
      coverPhoto as HTMLInputElement,
      'courses'
    );

    console.log(imageUrl);

    const course: CourseSchema = {
      lessons: [],
      createdAt: new Date().getTime(),
      description: description.value,
      photoUrl: imageUrl,
      status: 'SAVED',
      // @ts-ignore
      title: title.value,
    };

    const slug = slugify(course.title!, {
      lower: true,
    });

    const courseDoc = await addDoc(collection(db, 'courses'), course);
    await updateDoc(doc(db, 'courses', courseDoc.id), {
      url: `course/${courseDoc.id}`,
      slug: `course/${slug}`,
      updatedAt: new Date().getTime(),
    });
    setShowSpinner(true);
    alert('Course created');
    router.push('/courses');
  } catch (error) {
    setShowSpinner(true);
    console.log(error);
  }
};

export const editCourseFormHandler = async (
  { title, description }: any,
  courseId: string
) => {
  try {
    const slug = slugify(title, {
      lower: true,
    });

    const course: Partial<CourseSchema> = {
      updatedAt: new Date().getTime(),
      description: description,
      title,
      url: `course/${courseId}`,
      slug: `course/${slug}`,
    };

    await updateDoc(doc(db, 'courses', courseId), course);
    return [true, null];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};

export const createArticleHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  staus: ARTICLE_STATUS,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  selectedTags: typeof tags,
  selectedCategory: string,
  router: NextRouter
) => {
  setShowSpinner(true);
  try {
    e.preventDefault();

    let author: Author;

    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw Error('You are not loggged in yet');
    } else {
      author = await getUser(currentUser);
    }
    const { articleName, coverPhoto, body } = form;

    const imageUrl = await uploadImage(
      coverPhoto as HTMLInputElement,
      'articles'
    );

    console.log(imageUrl);

    const article: Partial<Article> = {
      title: articleName.value,
      body: body.value,
      description: body.value.slice(0, 200),
      createdAt: new Date().getTime(),
      coverPhoto: imageUrl,
      readingTimeInMins: body.value.length / 2000,
      author,
      likes: [],
      saves: [],
      tags: selectedTags,
      category: selectedCategory,
      status: staus!,
      views: [],
    };
    const articleDoc = await addDoc(collection(db, 'articles'), article);
    const slug = slugify(article?.title!, {
      lower: true,
    });
    await updateDoc(doc(db, 'articles', articleDoc.id), {
      url: `post/${articleDoc.id}`,
      slug: `post/${slug}`,
      updatedAt: new Date().getTime(),
    });
    setShowSpinner(true);
    alert('Article created');
    router.push('/user/posts');
  } catch (error) {
    setShowSpinner(true);
    console.log(error);
  }
};

export const signinWithGoogle = async (
  e: any,
  setShowSpinner2: Dispatch<SetStateAction<boolean>>,
  creator: boolean,
  router: NextRouter
) => {
  e.preventDefault();
  setShowSpinner2(true);
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    localStorage.setItem('userToken', token!);
    localStorage.setItem('userId', user.uid);
    console.log(credential, token, user);
    setShowSpinner2(false);
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator,
    });
    alert('Your account has been created successfully');
    router.push('/profile');
  } catch (error) {
    setShowSpinner2(false);
    console.log(error);
  }
};

export const createAccount = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  creator: boolean,
  router: NextRouter
) => {
  e.preventDefault();
  setShowSpinner(true);
  try {
    const { fullName, email, password, confirmPassword } = form;
    const userPayload = {
      name: fullName.value,
      email: email.value.toLowerCase(),
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    if (userPayload.password !== userPayload.confirmPassword) {
      throw Error('Passwords does not match');
    }

    const { user } = await createUserWithEmailAndPassword(
      auth,
      userPayload.email,
      userPayload.password
    );
    await sendEmailVerification(auth.currentUser as AuthUser);
    localStorage.setItem('userId', user.uid);
    console.log(user);
    await setDoc(doc(db, 'users', user.uid), {
      name: userPayload.name,
      email: userPayload.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator,
    });
    await updateProfile(auth.currentUser!, {
      displayName: userPayload.name,
    });
    setShowSpinner(false);
    alert('Your account has been created successfully');
    router.push('/user/profile');
  } catch (error: any) {
    setShowSpinner(false);
    console.log(error);
  }
};

export const getCourse = async (
  id: string
): Promise<[CourseSchema | null, any | null]> => {
  try {
    const docRef = doc(db, 'courses', id);
    const docRes = await getDoc(docRef);
    const course = { ...docRes.data(), id: docRes.id } as CourseSchema;
    return [course, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getCourses = async (): Promise<
  [CourseSchema[] | null, string | null]
> => {
  try {
    const _q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
    const _docRes = await getDocs(_q);
    const courses = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as CourseSchema[];
    return [courses, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getLessonsByCourseId = async (
  course: string
): Promise<[LessonSchema[] | null, string | null]> => {
  try {
    // console.log(course)
    const _q = query(
      collection(db, 'lessons'),
      where('courseId', '==', course),
      orderBy('createdAt', 'desc')
    );
    const _docRes = await getDocs(_q);
    const lessons = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as LessonSchema[];
    console.log(lessons);
    return [lessons, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getLessons = async (
  course: string
): Promise<[LessonSchema[] | null, string | null]> => {
  try {
    const _q = query(
      collection(db, 'lessons'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const _docRes = await getDocs(_q);
    const lessons = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as LessonSchema[];
    return [lessons, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getLesson = async (
  id: string
): Promise<[LessonSchema | null, any | null]> => {
  try {
    const docRef = doc(db, 'lessons', id);
    const docRes = await getDoc(docRef);
    const lesson = { ...docRes.data(), id: docRes.id } as LessonSchema;
    return [lesson, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getCurrentUser = async (): Promise<
  [AuthUser | null, string | null]
> => {
  try {
    const user = auth.currentUser;
    return [user, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getArticle = async (id: string) => {
  const ref = doc(db, 'articles', id);
  const docRes = await getDoc(ref);
  const article = { ...docRes.data(), id: docRes.id } as Article;

  const _q = query(
    collection(db, 'articles'),
    where('tags', 'array-contains-any', article.tags),
    orderBy('createdAt', 'desc'),
    limit(7)
  );
  const _docRes = await getDocs(_q);
  const articles = _docRes.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Article[];
  return { article, articles };
};


export const getArticleRef = async (id: string) => {
  const ref = doc(db, 'articles', id);
  const docRes = await getDoc(ref);
  const article = { ...docRes.data(), id: docRes.id } as Article;
  const articleRef: ArticleRef = {
    id: article.id,
    slug: article.slug,
    url: article.url,
    coverPhoto: article.coverPhoto,
    title: article.title
  }
  return { articleRef, article };
};

export const getUserArticles = async (user: UserProfile) => {
  delete user.bio, user.creator;
  const q = query(
    collection(db, 'articles'),
    where('author', '==', user),
    limit(7)
  );
  const docs = await getDocs(q);
  const articles = docs.docs.map(
    (docRes) => ({ ...docRes.data(), id: docRes.id } as Article)
  );
  return articles;
};

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w-]+/g, '')
    .replace(/ /g, '-');
};

export const getArticles = async () => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Article[];
  const sQ = query(
    collection(db, 'articles'),
    where('tags', 'array-contains-any', articles[0].tags),
    orderBy('createdAt', 'desc'),
    limit(10)
  );
  const sQDocRef = await getDocs(sQ);
  const secArticles = sQDocRef.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Article[];
  return { articles, secArticles };
};

export const createLessonFormHandler = async (
  form: HTMLFormElement,
  _course: string
) => {
  const { title, content, description } = form;
  console.log(_course);
  try {
    const [course, err] = await getCourse(_course);
    if (err) {
      return [null, err];
    }

    console.log(course);

    const coursePayload: CourseRef = {
      id: course?.id,
      url: course?.url ? course?.url : '',
      slug: course?.slug ? course?.slug : '',
    };

    const lesson: LessonSchema = {
      course: coursePayload,
      status: 'SAVED',
      description: description.value,
      courseId: course?.id!,
      // @ts-ignore
      title: title.value,
      courseContent: content.value!,
      createdAt: new Date().getTime(),
    };

    const lessonDoc = await addDoc(collection(db, 'lessons'), lesson);
    const slug = slugify(lesson.title, {
      lower: true,
    });
    await updateDoc(doc(db, 'lessons', lessonDoc.id), {
      url: `lessons/${lessonDoc.id}`,
      slug: `lessons/${slug}`,
      updatedAt: new Date().getTime(),
    });
    return [lessonDoc, null];
  } catch (error: any) {
    console.log(error);
    console.log(error);
    return [null, error.message];
  }
};

export const editLessonFormHandler = async (
  { title, description, content }: any,
  _course: string,
  _lesson: string
) => {
  try {
    const [course, err] = await getCourse(_course);
    if (err) {
      return [null, err];
    }

    const coursePayload: CourseRef = {
      id: course!.id,
      url: course!.url ? course?.url : '',
      slug: course!.slug ? course?.slug : '',
    };

    const slug = slugify(title, {
      lower: true,
    });
    const lesson: Partial<LessonSchema> = {
      course: coursePayload,
      status: 'SAVED',
      description: description,
      // @ts-ignore
      title,
      courseContent: content!,
      courseId: coursePayload?.id,
      url: `lessons/${_lesson}`,
      slug: `lessons/${slug}`,
      updatedAt: new Date().getTime(),
    };
    await updateDoc(doc(db, 'lessons', _lesson), lesson);
    return [true, null];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};

type GetUserWithoutIdPayload = [
  {
    articles: Article[];
    user: User;
  } | null,
  string | null
];

export const getUserWithoutID = async (): Promise<GetUserWithoutIdPayload> => {
  let userId: string;
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!;
  }
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, 'users', userId!);
    // console.log(userId)
    let userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const user = userDoc.data() as User;
      const q = query(
        collection(db, 'articles'),
        where('author.id', '==', userDoc.id),
        limit(3),
        orderBy('createdAt', 'desc')
      );
      const docs = await getDocs(q);
      const articles = docs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Article[];

      user.id = userDoc.id;
      return [{ articles, user }, null];
    }
  }
  return [null, 'Please login'];
};

async function getFile() {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };
  try {
    // @ts-ignore
    const fileHandle = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle[0].getFile();
    return [file, null];
  } catch (error: any) {
    return [null, error.message];
  }
}

export const uploadProfilePhoto = async (
  userId: string,
  fileInput: HTMLInputElement
): Promise<[string | null, string | null]> => {
  //@ts-ignore
  let [file, err] = await getFile();
  console.log(file, err);

  if (err) {
    // @ts-ignore
    const input = fileInput;

    input.click();
    input.onchange = async (e: Event) => {
      try {
        file = input.files![0];
        // console.log(file)
        const url = await uploadImage(file, 'profile-photo');

        await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
        await updateProfile(auth.currentUser!, { photoURL: url });
        return ['Profile Photo updated successfully!', null];
      } catch (error: any) {
        console.log(error.message);
        return [null, error.message];
      }
    };
  }

  const url = await uploadImage(file, 'profile-photo');
  await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
  await updateProfile(auth.currentUser!, { photoURL: url });
  return ['Profile Photo updated successfully!', null];
};

export const _updateProfile = async (form: HTMLFormElement, userId: string) => {
  try {
    const { username, phone, headline, github, twitter, linkedin, dev } = form;
    const payload = {
      username: username.value,
      phone: phone.value,
      headline: headline.value,
      github: github.value,
      twitter: twitter.value,
      linkedin: linkedin.value,
      dev: dev.value,
    };
    await updateDoc(doc(db, 'users', userId), payload);
    return ['Your profile has been updated successfully!', null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const updateBio = async (form: HTMLFormElement, userId: string) => {
  try {
    const { bio } = form;
    const payload = {
      bio: bio.value,
    };
    await updateDoc(doc(db, 'users', userId), payload);
    return ['Your bio has been updated successfully!', null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const hasUserEngaged = async (
  userId: string,
  articleId: string,
  type: ARTICLE_ENGAGEMENT
) => {
  const userRef = await getDoc(doc(db, 'users', userId));
  if (userRef.exists()) {
    const user = { ...userRef.data(), id: userRef.id } as User;
    const articleRef = await getDoc(doc(db, 'users', articleId));
    if (articleRef.exists()) {
      const article = { ...articleRef.data(), id: articleRef.id } as Article;
      const engagements = article[type];
      if (engagements.find((u) => u.id === user.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const toogleEngagement = async (
  userId: string,
  articleId: string,
  type: ARTICLE_ENGAGEMENT,
  updateEngagement: Dispatch<SetStateAction<boolean>>,
  updateEngagementList: Dispatch<SetStateAction<number>>
) => {
  // get a user Ref
  const userRef = await getDoc(doc(db, 'users', userId));
  if (userRef.exists()) {
    const user = { ...userRef.data(), id: userRef.id } as User;
    const articleRef = await getDoc(doc(db, 'articles', articleId));
    if (articleRef.data()) {
      const article = { ...articleRef.data(), id: articleRef.id } as Article;
      const engagements = article[type];
      let updateObj: Record<string, any> = {};
      if (engagements.find((u) => u.id === user.id)) {
        const updatedEngagements = engagements.filter((u) => u.id !== user.id);
        updateObj[type] = updatedEngagements;
        await updateDoc(doc(db, 'articles', article.id), { ...updateObj });
        updateEngagement(false);
        updateEngagementList(updatedEngagements.length);
        console.log(updatedEngagements);
      } else {
        const updatedEngagements = [
          ...engagements,
          {
            username: user.username,
            phone: user.phone,
            name: user.name,
            twitter: user.twitter,
            github: user.github,
            coverPhoto: user.profilePhoto,
            email: user.email,
            id: user.id,
          },
        ];
        updateObj[type] = updatedEngagements;
        await updateDoc(doc(db, 'articles', article.id), { ...updateObj });
        updateEngagement(true);
        updateEngagementList(updatedEngagements.length);
        console.log(updatedEngagements);
      }
    }
  }
};

export const createNotification = async (
  userId: string,
  type: NOTIFICATION_TYPE,
  head: string,
  body: string
) => {
  try {
    const notification: NotificiationSchema = {
      body,
      head,
      userId,
      type,
      createdAt: new Date().getTime(),
      isRead: false,
    };
    await addDoc(collection(db, 'notifications'), notification);
    return [true, null];
  } catch (error: any) {
    return [false, error.message];
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    await updateDoc(doc(db, 'notifications', id), { isRead: true });
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export const getNotification = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    const document = await getDoc(docRef);
    const notification = { ...document.data(), id: document.id };
    return [notification, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getUserNotifications = async (userId: string) => {
  try {
    const _q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc')
    );
    const _docRes = await getDocs(_q);
    const notifications = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as NotificiationSchema[];
    return [notifications, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const markMultipleNotificationsAsRead = async (ids: string[]) => {
  try {
    ids.forEach(async (id: string) => {
      const res = await markNotificationAsRead(id);
      if (!res) {
        return [res, 'No notification with that id'];
      }
    });
    return [true, null];
  } catch (error: any) {
    return [false, error.message];
  }
};

export const createComment = async ({
  articleId,
  body,
  owner,
  parentCommentId
}: CreateCommentPayload): Promise<[boolean, string|null]> => {
  try {
    const { articleRef, article } = await getArticleRef(articleId);
    let comments = article.comments ? article.comments: [];
    const comment: Comment = parentCommentId ? {
      article: articleRef,
      articleId,
      body,
      likes: [],
      createdAt: new Date().getTime(),
      owner,
      ownerId: owner.id,
      id: randomBytes(4).toString('hex'),
      parentComment: parentCommentId
    } : {
      article: articleRef,
      articleId,
      body,
      likes: [],
      createdAt: new Date().getTime(),
      owner,
      ownerId: owner.id,
      id: randomBytes(4).toString('hex')
    }
    comments.push(comment);
    await updateDoc(doc(db, 'articles', articleId), { comments });
    return [true, null]
  } catch (error: any) {
    return [false, error.message]
  }
}

export const updateComment = async (articleId: string, id: string, body: string): Promise<[boolean, string | null]> => {
  try {
    const { article } = await getArticleRef(articleId);
    const comments = article.comments;
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      comment.body = body;
      const filteredComments = comments.filter((c) => c.id !== comment.id);
      filteredComments.push(comment);
      await updateDoc(doc(db, 'articles', id), { comments: filteredComments });
      return [true, null];
    };
    return [false, 'comment not found']
  } catch (error: any) {
    console.log(error)
    return [false, error.message]
  }
}

export const deleteComment = async (articleId: string, id: string) => {
  try {
    const { article } = await getArticleRef(articleId);
    const comments = article.comments;
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      const filteredComments = comments.filter((c) => c.id !== comment.id);
      await updateDoc(doc(db, 'articles', id), { comments: filteredComments });
      return [true, null];
    };
    return [false, 'comment not found']
  } catch (error: any) {
    console.log(error)
    return [false, error.message]
  }
}