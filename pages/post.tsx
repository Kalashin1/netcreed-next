import Layout from "./Layout";
import PostHeader from "../components/Post-Header";
import PostContent from "../components/Post-Content";
import AlikePost from "../components/Alike-Post";
import { NextPage } from "next";

const Post: NextPage = () => {
  return (
    <Layout>
      <PostHeader />
      <PostContent />
      <AlikePost />
    </Layout>
  );
};

export default Post;
