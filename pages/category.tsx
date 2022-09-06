import { NextPage } from "next";
import Layout from "./Layout";
// import Header from "../components/Header";
import Categories from "../components/Categories";
import NewsLetter from "../components/Newletter";

const Category:NextPage = () => {
  return (
    //@ts-ignore
    <Layout>
      <Categories />
      <NewsLetter />
    </Layout>
  )
}

export default Category;