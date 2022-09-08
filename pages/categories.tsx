import Layout from "./Layout";
import Header from "../components/Header";
import CategoriesComponent from "../components/Categories";
import NewsLetter from "../components/Newletter";
import { NextPage } from "next";

const Categories: NextPage = () => {
  return (
    // @ts-ignore
    <Layout>
      <CategoriesComponent />
    </Layout>
  )
};

export default Categories;