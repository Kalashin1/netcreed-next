import Layout from './Layout';
import AboutUs from '../components/About-us';
import OtherPosts from '../components/Other-Posts';
import NewsLetter from '../components/Newletter';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Article } from '../types';
import { getArticles } from '../helper';

export const getServerSideProps = async () => {
  const { articles } = await getArticles();
  return {
    props: {
      articles,
    },
  };
};

export type Articles = {
  articles: Article[];
};

// @ts-ignore
const About: NextPage = ({ articles }) => {
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };
  return (
    //@ts-ignore
    <Layout>
      <div>
        <AboutUs />
        <OtherPosts
          allPosts={articles.slice(0, 2)}
          featuredPosts={articles.slice(5, articles.length - 2)}
        />
        <NewsLetter />
      </div>
    </Layout>
  );
};

export default About;
