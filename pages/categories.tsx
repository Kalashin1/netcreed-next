import Layout from "./Layout";
import Header from "../components/Header";
import CategoriesComponent from "../components/Categories";
import NewsLetter from "../components/Newletter";
import { NextPage } from "next";
import { db } from "../Firebase-settings";
import { orderBy, limit, collection, query, getDocs, where } from "firebase/firestore"
import { Article } from "../types"

export const getStaticProps = async () => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'), limit(10));
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

const Categories: NextPage = () => {
  return (
    // @ts-ignore
    <Layout>
      <CategoriesComponent />
    </Layout>
  )
};

export default Categories;