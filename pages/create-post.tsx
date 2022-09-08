import CreateArticleForm from "../components/Create-Article-Form";
import Layout from "./Layout";
import { NextPage } from "next";

const CreateArticle: NextPage = () => {
  return (
    //@ts-ignore
    <Layout>
      <h2 className="text-center my-4">Create A Post</h2>
      <CreateArticleForm />
    </Layout>
  )
};

export default CreateArticle;