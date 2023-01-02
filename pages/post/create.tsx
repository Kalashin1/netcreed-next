import CreateArticleForm from '../../components/Create-Article-Form';
import Layout from '../Layout';
import { NextPage } from 'next';
import { useContext } from 'react';
import { ThemeContext } from '../_app';
import React from 'react';

const CreateArticle: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    //@ts-ignore
    <Layout>
      <h2
        className={`text-center my-4 text-${
          theme === 'dark' ? 'light' : 'dark'
        }`}
      >
        Create A Post
      </h2>
      <CreateArticleForm />
    </Layout>
  );
};

export default CreateArticle;
