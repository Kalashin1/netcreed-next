import EditArticleForm from "../../components/Edit-Post-Form";
import Layout from "../Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Article } from "../../types";

const EditPost: NextPage = () => {
  const router = useRouter();
  const { id } = router.query
  console.log(id) 

  

  return (
    //@ts-ignore
    <Layout>
      <h2 className="text-center my-4">Edit Post</h2>
      {/* @ts-ignore */}
      { id && (<EditArticleForm id={id} />) }
    </Layout>
  )
};

export default EditPost;