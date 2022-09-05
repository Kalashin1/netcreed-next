import Layout from './Layout';
import { NextPage } from 'next';
import UserProfile from '../components/Profile';

const Profile: NextPage = () => {

  return (
    //@ts-ignore
    <Layout>
      <UserProfile />
    </Layout>
  )
}

export default Profile