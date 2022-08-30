import Header from '../components/Header';
import { NextPage } from 'next';
import RecentPosts from '../components/Recent-Posts';
import OtherPosts from '../components/Other-Posts';
import Layout from './Layout';
import NewsLetter from '../components/Newletter';


import { useState, useEffect } from 'react';
import { Article } from '../types';
import { db } from '../Firebase-settings';
import { collection, getDocs, query } from 'firebase/firestore';

export const getStaticProps = async() => {
  const q = query(collection(db, 'articles'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  // console.log(articles)

  return {
    props: {
      articles,
    },
  }
}

export type Articles = {
  articles: Article[]
} 

const Home: NextPage = ({ articles }) => {

  // const [posts, setPosts] = useState<Article[]>([]);
  // const [allPosts, setAllPosts] = useState<Article[]>([]);

  // useEffect(() => {
  //   const getDocuments = async () => {
  //     const q = query(collection(db, 'articles'));
  //     const docRes = await getDocs(q);
  //     const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  //     // console.log(articles);
  //     setPosts(articles);
  //     setAllPosts(articles);
  //   }
  //   getDocuments()
  // }, [])

  return (
    <Layout>
      <Header />
      { articles && (<RecentPosts posts={articles} />) }
      { articles && (<OtherPosts allPosts={articles} featuredPosts={articles} />)}
      {/* { posts && (<RecentPosts posts={posts} />) }
      { allPosts && posts && (<OtherPosts allPosts={allPosts} featuredPosts={posts} />)} */}
      <NewsLetter />
    </Layout>
  );
}

export default Home;