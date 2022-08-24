import Header from '../components/Header';
import { NextPage } from 'next';
import RecentPosts from '../components/Recent-Posts';
import OtherPosts from '../components/Other-Posts';
import Layout from './Layout';
import NewsLetter from '../components/Newletter';

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <RecentPosts />
      <OtherPosts />
      <NewsLetter />
    </Layout>
  );
}

export default Home;