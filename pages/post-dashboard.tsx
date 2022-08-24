import Layout from './Layout';
import { NextPage } from 'next';
import Posts from '../components/Posts';

const PostDashboard: NextPage = () => {
  return (
    <Layout>
      <Posts />
    </Layout>
  )
};

export default PostDashboard;