import { NextComponentType } from "next";
import { MultiSelect } from "react-multi-select-component";
import { useState, useRef, useEffect, MutableRefObject, FormEvent, FC } from "react";
import { randomBytes } from "crypto";
import { auth, db, storage } from "../Firebase-settings";
import { getDoc, doc, updateDoc } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Article, ARTICLE_STATUS, Author, User as _User } from "../types";
import { User } from "@firebase/auth";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import { useRouter } from "next/router";
import { Button, Spinner, Form, Container } from "react-bootstrap";

const tags = [
  { label: "JavaScript", value: "js" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "NodeJS", value: "node" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "python" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Go", value: "go"},
  { label: "Vue", value: "vue"},
  { label: "Svelte", value: "svelte"},
  { label: "Solidity", value: "solidity"},
  { label: "AWS", value: 'aws'},
  { label: "GCP", value: "gcp"},
  { label: "MongoDB", value: "mongodb"},
  { label: "SQL", value: "sql"}
];

type _article = {
  id: string
}

const EditArticleForm: FC<_article> = ({ id }) => {

  let theme: string = useContext(ThemeContext).theme;

  const [selectedTags, setSelectedTags] = useState([] as typeof tags);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [article, setArticle] = useState({} as Article)



  useEffect(() => {
    const getPost = async (id: string) => {
      // const ref = ;
      const docRes = await getDoc(doc(db, 'articles', id));
      const article = ({ ...docRes.data(), id: docRes.id }) as Article;
      console.log(article)
      setArticle(article);
      setSelectedTags(article.tags)
      setSelectedCategory(article.category)
      setTitle(article.title)
      setBody(article.body)
    }

    getPost(id)
  }, [id])

  // console.log(article)

  const router = useRouter();
  const categories = [
    { label: 'Programming', value: 'coding' },
    { label: 'UI/UX', value: 'ui/ux' },
    { label: 'Digital Marketing', value: 'digiMarketing' },
    { label: 'Game Development', value: 'gameDev' }
  ]

  const createArticleForm: MutableRefObject<null | HTMLFormElement> = useRef(null);



  const coverPhoto: MutableRefObject<null | HTMLInputElement> = useRef(null);
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

  const createArticle = async (e: FormEvent<HTMLFormElement>, staus: ARTICLE_STATUS) => {
    setShowSpinner(true)
    try {
      e.preventDefault();

      const currentUser = auth.currentUser;

      let imageUrl;

      const photo = coverPhoto.current!

      if (photo.files![0]) {
        imageUrl = await uploadImage(photo);
      } else {
        imageUrl = article.coverPhoto;
      }

      console.log(imageUrl);

      const articleUpdate: Partial<Article> = {
        title: title,
        body: body,
        description: body.slice(0, 200),
        updatedAt: new Date().getTime(),
        coverPhoto: imageUrl,
        tags: selectedTags,
        category: selectedCategory,
        status: staus!,
      }
      await updateDoc(doc(db, 'articles', article.id), articleUpdate);
      setShowSpinner(true)
      alert('Article Edited');
      router.push('/post-dashboard');
    } catch (error) {
      setShowSpinner(true)
      console.log(error)
    }
  }

  return (
    <Container className="container">
      <div>
        <Form name="articleForm" ref={createArticleForm} onSubmit={e => createArticle(e, 'saved')}>
          <Form.Group>
            <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`} htmlFor="exampleFormControlInput1">Title</Form.Label>
            <Form.Control type="text" name="articleName" value={title} onChange={e => setTitle(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`} htmlFor="exampleFormControlFile1">Select Cover Photo</Form.Label>
            <Form.Control type="file" name="coverPhoto" ref={coverPhoto} className="form-control" id="exampleFormControlFile1" />
          </Form.Group>
          <Form.Group>
            <label>Select Category</label>
            <select onChange={e => setSelectedCategory(e.target.value)} className="form-control">
              {categories.map((cat, index) => (
                <option key={index} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`}>Select Tag</Form.Label>
            <MultiSelect
              options={tags}
              value={selectedTags}
              onChange={setSelectedTags}
              labelledBy="Select"
            />
          </Form.Group>
          <Form.Group>
            <label className={`text-${theme === "dark" ? "light": "dark"}`} htmlFor="exampleFormControlTextarea1">
              Post Content
            </label>
            <textarea className="form-control" value={body} onChange={e => setBody(e.target.value)} name="body" id="exampleFormControlTextarea1" rows={8}></textarea>
          </Form.Group>

          <div className="my-2 flex">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              {showSpinner && (<Spinner animation="border" role="status">
              </Spinner>)}
              {!showSpinner && 'Save Information'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default EditArticleForm;