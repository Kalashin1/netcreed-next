import EditArticleForm from "../../../components/Edit-Post-Form";
import Layout from "../../Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../../_app";

const EditPost: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();
  const { id } = router.query
  console.log(id) 

  

  return (
    //@ts-ignore
    <Layout>
      <h2 className={`text-center my-4 text-${theme === "dark"? "light" : "dark"}`}>Edit Post</h2>
      {/* @ts-ignore */}
      { id && (<EditArticleForm id={id} />) }
    </Layout>
  )
};

export default EditPost;