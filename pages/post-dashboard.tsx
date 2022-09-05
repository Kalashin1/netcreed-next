import Layout from './Layout';
import { NextPage } from 'next';
import Posts from '../components/Posts';
import { useState, useEffect } from 'react';
import { Article } from '../types';
import { db } from '../Firebase-settings';
import { collection, getDocs, query, where } from '@firebase/firestore';

const PostDashboard: NextPage = () => {

  let userId: string;
  const [posts, setPosts] = useState<Article[]>([])

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!;
  }

  useEffect(() => {
    const getDocuments = async () => {
      const q = query(collection(db, 'articles'), where('author.id', '==', `${userId}`));
      const docRes = await getDocs(q);
      const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
      console.log(articles);
      setPosts(articles);
    }
    getDocuments()
  }, [])

  return (
    //@ts-ignore
    <Layout>
      { posts && (<Posts posts={posts} />) }
    </Layout>
  )
};

export default PostDashboard;