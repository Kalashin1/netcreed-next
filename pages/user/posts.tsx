import Layout from '../Layout';
import { NextPage } from 'next';
import Posts from '../../components/Posts';
import { useState, useEffect, useContext } from 'react';
import { Article } from '../../types';
import { db } from '../../Firebase-settings';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { ThemeContext } from '../_app';

const PostDashboard: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;

  let userId: string;
  const [posts, setPosts] = useState<Article[]>([]);

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!;
  }

  const getDocuments = async () => {
    const q = query(
      collection(db, 'articles'),
      where('author.id', '==', `${userId}`)
    );
    const docRes = await getDocs(q);
    const articles = docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Article[];
    setPosts(articles);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    //@ts-ignore
    <Layout>
      {posts && <Posts posts={posts} theme={theme} setPosts={setPosts} />}
    </Layout>
  );
};

export default PostDashboard;
