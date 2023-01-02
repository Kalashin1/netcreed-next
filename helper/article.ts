import { doc, getDoc, query, collection, where, orderBy, limit, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { NextRouter } from "next/router";
import { FormEvent, Dispatch, SetStateAction, MutableRefObject } from "react";
import slugify from "slugify";
import { auth, db } from "../Firebase-settings";
import { tags, getUser, uploadImage } from "../helper";
import { Article, ArticleRef, ARTICLE_STATUS, Author, User, UserProfile as _UserProfile } from "../types";

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
    title: article.title,
    description: article.description,
  };
  return { articleRef, article };
};

export const getUserArticles = async (user: Partial<_UserProfile>) => {
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

export const getAllUserArticles = async (user: Partial<_UserProfile>) => {
  delete user.bio, delete user.creator;
  const q = query(collection(db, 'articles'), where('author', '==', user));
  console.log(user);
  const docs = await getDocs(q);
  const articles = docs.docs.map(
    (docRes) => ({ ...docRes.data(), id: docRes.id } as Article)
  );
  const total = docs.docs.length;
  console.log(total);
  return { articles, total };
};

export const createArticleHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  status: ARTICLE_STATUS,
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
    let user: User;

    if (!currentUser) {
      throw Error('You are not logged in yet');
    } else {
      author = await getUser(currentUser);
      const docRef = await doc(db, 'users', currentUser.uid);
      const document = await getDoc(docRef);
      user = (await document.data()) as User;
    }
    const { articleName, coverPhoto, body } = form;

    const imageUrl = await uploadImage(
      coverPhoto as HTMLInputElement,
      'articles'
    );

    const userArticles = user.articles ?? [];

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
      status: status!,
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
    userArticles.push({
      coverPhoto: imageUrl,
      url: `post/${articleDoc.id}`,
      id: articleDoc.id,
      slug: `post/${slug}`,
      description: article.description!,
      title: articleName.value,
    });
    await updateDoc(doc(db, 'users', user.id), {
      articles: [...userArticles],
    });
    setShowSpinner(true);
    alert('Article created');
    router.push('/user/posts');
  } catch (error) {
    setShowSpinner(true);
    console.log(error);
  }
};

interface EditArticlePayload {
  title: string;
  body: string;
  selectedTags: typeof tags;
  selectedCategory: string;
}

export const updateArticle = async (
  e: FormEvent<HTMLFormElement>,
  status: ARTICLE_STATUS,
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
      status: status!,
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