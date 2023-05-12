import Layout from '../Layout';
import { NextPage } from 'next';
import Posts from '../../components/Posts';
import { useState, useEffect, useContext } from 'react';
import { Article } from '../../types';
import { db } from '../../Firebase-settings';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { ThemeContext } from '../_app';
import { orderBy } from 'firebase/firestore';

const PostDashboard: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;

  let userId: string;
  const [posts, setPosts] = useState<Article[]>([]);

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  useEffect(() => {

    const getDocuments = async () => {
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
      setPosts(articles);
    };

    getDocuments();
    // @ts-ignore
  }, [userId]);

  return (
    //@ts-ignore
    <Layout>
      {posts && <Posts posts={posts} theme={theme} setPosts={setPosts} />}
    </Layout>
  );
};

export default PostDashboard;
