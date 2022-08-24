import { NextComponentType } from "next";
import { MultiSelect } from "react-multi-select-component";
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { db } from "../Firebase-settings";
import { addDoc } from "@firebase/firestore";
import { Article } from "../types";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const CreateArticleForm: NextComponentType = () => {

  const createArticleForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  const [selected, setSelected] = useState([]);

  const createArticle = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
    const { title, coverPhoto, body } = form;
    // TODO: upload image to cloudinary
    const article: Partial<Article> = {
      title,
      body,
      description: body.slice(0, 50),
      createdAt: new Date().getTime().toString(),
      
    }

  }

  return (
    <div className="container">
      <div>
        <form name="articleForm">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input type="text" name="title" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Select Cover Photo</label>
            <input type="file" name="coverPhoto" className="form-control-file" id="exampleFormControlFile1" />
          </div>
          <div className="form-group">
            <label>Select Tag</label>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
          <div className="form-group">
            <label>Add To</label>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Post Content</label>
            <textarea className="form-control" name="body" id="exampleFormControlTextarea1" rows={8}></textarea>
          </div>

          <div className="my-2 flex">
            <button className="btn btn-primary" style={{ width: '100%'}}>
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateArticleForm;