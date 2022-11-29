import { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../Layout';
import RecentPosts from '../../../components/Recent-Posts';
import { getAllUserArticles, getProfile } from '../../../helper';
import { useContext } from 'react';
import { ThemeContext } from '../../_app';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const user = await getProfile(id as string);
  const { articles } = await getAllUserArticles(user);
  return {
    props: { articles },
  };
};

// @ts-ignore
const UserArticles: NextPage = ({ articles }) => {
  const theme = useContext(ThemeContext).theme;
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <>
        <h3
          className={`ml-4 pl-4 my-4 text-${
            theme === 'dark' ? 'light' : 'dark'
          }`}
        >
          User Posts
        </h3>
        {articles && <RecentPosts posts={articles} />}
      </>
    </Layout>
  );
};

export default UserArticles;
