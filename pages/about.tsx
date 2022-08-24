import Header from "../components/Header";
import Layout from "./Layout";
import AboutUs from "../components/About-us";
import OtherPosts from "../components/Other-Posts";
import NewsLetter from "../components/Newletter";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Layout>
      <div>
        <Header />
        <AboutUs />
        <OtherPosts />
        <NewsLetter />
      </div>
    </Layout>
  )
};

export default About;