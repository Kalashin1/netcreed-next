import { getUser } from './../../../helper';
import { addDoc, collection, updateDoc, doc, getDoc } from 'firebase/firestore';
import { IncomingMessage, ServerResponse } from 'http'
import slugify from 'slugify';
import { db } from '../../../Firebase-settings';
import { Article, User } from '../../../types';


export default async function handler(req: any, res: any) {
  const { imageUrl, title, body, authorId, description, selectedTags, selectedCategory } = req.body
  try {
    const author = await getUser(authorId);
    const slug = slugify(title, {
      lower: true,
    });
    const article: Partial<Article> = {
      title: title,
      body: body,
      description: description,
      createdAt: new Date().getTime(),
      coverPhoto: imageUrl,
      readingTimeInMins: body.length / 2000,
      author,
      likes: [],
      saves: [],
      tags: selectedTags,
      category: selectedCategory,
      status: 'saved',
      views: [],
      slug,
    };
    const articleDoc = await addDoc(collection(db, 'articles'), article);
   
    await updateDoc(doc(db, 'articles', articleDoc.id), {
      url: `post/${articleDoc.id}`,
      updatedAt: new Date().getTime(),
    });
    let user: User;
    const docRef = await doc(db, 'users', author.id);
    const document = await getDoc(docRef);
    user = (await document.data()) as User;
    const userArticles = user.articles ?? [];
    userArticles.push({
      coverPhoto: imageUrl,
      url: `post/${articleDoc.id}`,
      id: articleDoc.id,
      slug: `${slug}`,
      description: article.description!,
      title,
    });
    console.log(author);
    await updateDoc(doc(db, 'users', author.id), {
      articles: [...userArticles],
    });
    res.status(200).json({ })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}