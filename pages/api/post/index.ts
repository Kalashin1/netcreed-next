import { IncomingMessage, ServerResponse } from 'http'
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase-settings';
import { Article } from '../../../types';

const getDocuments = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'articles'),
      where('author.id', '==', `${userId}`),
      orderBy('createdAt', 'desc')
    );
    const docRes = await getDocs(q);
    const articles = docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Article[];
    return [articles, null]
  } catch (error: any) {
    return [null, error];
  }

}

  export default async function handler(req: any, res: any) {
    const { id } = req.query;
    const [articles, error] = await getDocuments(id);
    if (error) {
      res.status(404).json({ error: 'user not found'})
    } else {
      res.status(200).json({ articles });
    }
  }