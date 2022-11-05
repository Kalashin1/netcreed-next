import Header from '../components/Header';
import { NextPage } from 'next';
import Head from 'next/head';
import RecentPosts from '../components/Recent-Posts';
import OtherPosts from '../components/Other-Posts';
import Layout from './Layout';
import NewsLetter from '../components/Newletter';
import { useContext, useState } from 'react';
import { ThemeContext } from './_app';

import { Article } from '../types';
import { db } from '../Firebase-settings';
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  where 
} from 'firebase/firestore';

export const getStaticProps = async () => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  const sQ = query(collection(db, 'articles'), where('tags', 'array-contains', articles[0].tags[0]), orderBy('createdAt', 'desc'), limit(10))
  const sQDocRef = await getDocs(sQ);
  const secArticles = sQDocRef.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  // console.log(articles)

  return {
    props: {
      articles,
      alikePosts: secArticles
    },
  }
}

export type Articles = {
  articles: Article[]
}

//@ts-ignore
const Home: NextPage = ({ articles, alikePosts }) => {

  let theme: string = useContext(ThemeContext).theme;
  let setTheme = useContext(ThemeContext).setTheme;

  return (
    //@ts-ignore
    <Layout>
      <Head>
        <meta name="title" content="Netcreed, Software Development" />
        <meta name="description" content="Software development platform for FullStack Development, JavaScript Development and Mobile Development" />
        <meta name="keywords" content="javascript, nodejs, typescript, react, coding, software, backend, frontend, svelte, angular" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content="Kinanee Samson" />
        <title>Netcreed</title>
        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kinanee_samson" />
        <meta name="twitter:creator" content="@kinanee_samson" />
        <meta name="twitter:title" content="Netcreed" />
        <meta name="twitter:description" content="Software development platform for FullStack Development, JavaScript Development and Mobile Development." />
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/foodkal-01.appspot.com/o/Untitled%20design.png?alt=media&token=6fc883b7-cb07-4c96-9633-16a0ccea05fe" />
        {/* Open Graph  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://netcreed-blog.vercel.app/" />
        <meta property="og:title" content="Netcreed" />
        <meta property="og:description" content="Software development platform for FullStack Development, JavaScript Development and Mobile Development." />
        <meta property="og:image" itemProp="image" content="https://firebasestorage.googleapis.com/v0/b/foodkal-01.appspot.com/o/Untitled%20design.png?alt=media&token=6fc883b7-cb07-4c96-9633-16a0ccea05fe" />
      </Head>
      { articles && (<Header article={articles[0]} />) }
      { alikePosts && (<OtherPosts allPosts={alikePosts.slice(1, 5)} featuredPosts={alikePosts.slice(5, alikePosts.length)} />)}
      { articles && (<RecentPosts posts={articles.slice(1, articles.length)} />)}
    </Layout>
  );
}

export default Home;