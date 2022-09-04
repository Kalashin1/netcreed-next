import Header from "../components/Header";
import Layout from "./Layout";
import AboutUs from "../components/About-us";
import OtherPosts from "../components/Other-Posts";
import NewsLetter from "../components/Newletter";
import { NextPage } from "next";
import { Article } from "../types";
import { db } from "../Firebase-settings";
import { query, collection, getDocs, doc } from "@firebase/firestore";

export const getStaticProps = async () => {
  const q = query(collection(db, 'articles'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

  return {
    props: {
      articles,
    },
  }
}

export type Articles = {
  articles: Article[]
}

// @ts-ignore
const About: NextPage = ({ articles }) => {
  return (
    //@ts-ignore
    <Layout>
      <div>
        <Header />
        <AboutUs />
        <OtherPosts allPosts={articles} featuredPosts={articles} />
        <NewsLetter />
      </div>
    </Layout>
  )
};

export default About;