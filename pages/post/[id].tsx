import Layout from "../Layout";
import PostHeader from "../../components/Post-Header";
import PostContent from "../../components/Post-Content";
import AlikePost from "../../components/Alike-Post";
import { NextPage } from "next";
import { db } from '../../Firebase-settings';
import { collection, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { Article } from "../../types";


export const getStaticPaths = async () => {
  const q = query(collection(db, 'articles'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

  const paths = articles.map(article => ({params: { id: article.id }}))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const ref = doc(db, 'articles', id);
  const docRes = await getDoc(ref);
  const article =({ ...docRes.data(), id: docRes.id }) as Article;

  const _q = query(collection(db, 'articles'));
  const _docRes = await getDocs(_q);
  const articles = _docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

  return {
    props: { article, articles }
  }

}

const Post: NextPage = ({ article, articles }) => {
  console.log(article);
  return (
    <Layout>
      { article && (<PostHeader article={article} />) }
      { article && (<PostContent article={article} />) }
      <AlikePost articles={articles} />
    </Layout>
  );
};

export default Post;
