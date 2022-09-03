import Layout from "../Layout";
import PostHeader from "../../components/Post-Header";
import PostContent from "../../components/Post-Content";
import AlikePost from "../../components/Alike-Post";
import { NextPage } from "next";
import Head from "next/head";
import { db } from '../../Firebase-settings';
import { collection, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { Article } from "../../types";


export const getStaticPaths = async () => {
  const q = query(collection(db, 'articles'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

  const paths = articles.map(article => ({ params: { id: article.id } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const ref = doc(db, 'articles', id);
  const docRes = await getDoc(ref);
  const article = ({ ...docRes.data(), id: docRes.id }) as Article;

  const _q = query(collection(db, 'articles'));
  const _docRes = await getDocs(_q);
  const articles = _docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

  return {
    props: { article, articles }
  }

}

// @ts-ignore
const Post: NextPage = ({ article, articles }) => {
  console.log(article);
  return (
    // @ts-ignore
    <Layout>
      <Head>
        <meta name="title" content="Netcreed, Software Development" />
        <meta name="description" content="Software development platform for FullStack Development, JavaScript Development and Mobile Development" />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content={article.author.name} />
         {/* TWITTER CARD  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kinanee_samson" />
        <meta name="twitter:creator" content="@kinanee_samson" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.cover_image} />
        {/* <!--Open Graph  */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://netcreed.web.app/${article.id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" itemProp="image" content={article.cover_image} />
      </Head>
      {article && (<PostHeader article={article} />)}
      {article && (<PostContent article={article} />)}
      <AlikePost articles={articles} />
    </Layout>
  );
};

export default Post;