import Header from '../components/Header';
import { NextPage } from 'next';
import Head from 'next/head';
import RecentPosts from '../components/Recent-Posts';
import OtherPosts from '../components/Other-Posts';
import Layout from './Layout';
import NewsLetter from '../components/Newletter';


import { Article } from '../types';
import { db } from '../Firebase-settings';
import { collection, getDocs, query } from 'firebase/firestore';

export const getStaticProps = async () => {
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

//@ts-ignore
const Home: NextPage = ({ articles }) => {

  

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
        <meta name="twitter:image" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg" />
        {/* Open Graph  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://netcreed.web.app/" />
        <meta property="og:title" content="Netcreed" />
        <meta property="og:description" content="Software development platform for FullStack Development, JavaScript Development and Mobile Development." />
        <meta property="og:image" itemProp="image" content="https://yourimagepath.jpg" />
      </Head>
      { articles && (<Header article={articles[0]} />) }
      {articles && (<RecentPosts posts={articles} />)}
      {articles && (<OtherPosts allPosts={articles} featuredPosts={articles} />)}
      {/* { posts && (<RecentPosts posts={posts} />) }
      { allPosts && posts && (<OtherPosts allPosts={allPosts} featuredPosts={posts} />)} */}
      <NewsLetter />
    </Layout>
  );
}

export default Home;