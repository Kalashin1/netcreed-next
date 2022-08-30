import { NextComponentType } from "next";
import { MultiSelect } from "react-multi-select-component";
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { randomBytes } from "crypto";
import { auth, db, storage } from "../Firebase-settings";
import { getDoc, doc, addDoc, collection } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Article, ARTICLE_STATUS, Author, User as _User } from "../types";
import { User } from "@firebase/auth";
import { useRouter } from "next/router";
import { Button, Spinner } from "react-bootstrap";

const tags = [
  { label: "JavaScript", value: "js" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "NodeJS", value: "node" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "python" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
];

const publishTypes = [
  { label: 'Published', value: 'publish' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archive', value: 'archive' }
]

const CreateArticleForm: NextComponentType = () => {

  const router = useRouter();

  const createArticleForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPublishTypes, setSelectedPublishTypes] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const uploadImage = async (file: HTMLInputElement) => {
    const extension = file.files![0].name.split('.')[1];

    const key = randomBytes(16).toString('hex');
    const name = `${key}.${extension}`;
    localStorage.setItem('name', name);


    const storageRef = ref(storage)
    const articleImagesRef = ref(storageRef, `articles/${name}`);

    const metadata = {
      contentType: 'image/jpeg',
    };

    const res = await uploadBytes(articleImagesRef, file.files![0], metadata);

    const imageUrl = await getDownloadURL(articleImagesRef);

    return imageUrl;
  }

  const getUser = async (user: User) => {
    const uid = user.uid;
    const docRef = doc(db, 'users', uid);
    const document = await getDoc(docRef);
    const userDoc = await document.data() as _User;
    return {
      username: userDoc.username,
      phone: userDoc.phone,
      name: userDoc.name,
      twitter: userDoc.twitter,
      github: userDoc.github,
      coverPhoto: userDoc.coverPhoto? userDoc.coverPhoto: 'url',
      email: userDoc.email,
      id: document.id,
    }
  }

  const createArticle = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, staus: ARTICLE_STATUS) => {
    setShowSpinner(true)
    try {
      e.preventDefault();

      let author: Author;

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw Error('You are not loggged in yet');
      } else {
        author = await getUser(currentUser);
      }
      const { articleName, coverPhoto, body } = form;

      const imageUrl = await uploadImage(coverPhoto as HTMLInputElement);

      console.log(imageUrl);

      const article: Partial<Article> = {
        title: articleName.value,
        body: body.value,
        description: body.value.slice(0, 50),
        createdAt: new Date().getTime(),
        coverPhoto: imageUrl,
        readingTimeInMins: (body.value.length / 200),
        author,
        likes: 0,
        saves: 0,
        tags: selectedTags,
        status: staus!,
        views: 0,
      }
      await addDoc(collection(db, 'articles'), article);
      setShowSpinner(true)
      alert('Article created');
      router.push('/post-dashboard');
    } catch (error) {
      setShowSpinner(true)
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div>
        <form name="articleForm" ref={createArticleForm} onSubmit={e => createArticle(e, createArticleForm.current!, 'saved')} >
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input type="text" name="articleName" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Select Cover Photo</label>
            <input type="file" name="coverPhoto" className="form-control" id="exampleFormControlFile1" />
          </div>
          <div className="form-group">
            <label>Select Tag</label>
            <MultiSelect
              options={tags}
              value={selectedTags}
              onChange={setSelectedTags}
              labelledBy="Select"
            />
          </div>
          <div className="form-group">
            <label>Add To</label>
            <MultiSelect
              options={publishTypes}
              value={selectedPublishTypes}
              onChange={setSelectedPublishTypes}
              labelledBy="Select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Post Content</label>
            <textarea className="form-control" name="body" id="exampleFormControlTextarea1" rows={8}></textarea>
          </div>

          <div className="my-2 flex">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              {showSpinner && (<Spinner animation="border" role="status">
              </Spinner>)}
              {!showSpinner && 'Save Information'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateArticleForm;