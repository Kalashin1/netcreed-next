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
];

type SelectType = {
  label: string, value: string
}


const CreateArticleForm: NextComponentType = () => {
  
  const router = useRouter();
  const categories = [
    { label: 'Programming', value: 'coding' },
    { label: 'UI/UX', value: 'ui/ux' },
    { label: 'Digital Marketing', value: 'digiMarketing' },
    { label: 'Game Development', value: 'gameDev'}
  ]

  const createArticleForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
      coverPhoto: userDoc.profilePhoto,
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
        description: body.value.slice(0, 200),
        createdAt: new Date().getTime(),
        coverPhoto: imageUrl,
        readingTimeInMins: (body.value.length / 2000),
        author,
        likes: [],
        saves: [],
        tags: selectedTags,
        category: selectedCategory,
        status: staus!,
        views: [],
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
    <Container>
      <div>
        <Form name="articleForm" ref={createArticleForm} onSubmit={e => createArticle(e, createArticleForm.current!, 'saved')} >
          <Form.Group>
            <Form.Label htmlFor="exampleFormControlInput1">Title</Form.Label>
            <Form.Control type="text" name="articleName" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="exampleFormControlFile1">Select Cover Photo</Form.Label>
            <Form.Control type="file" name="coverPhoto" className="form-control" id="exampleFormControlFile1" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <Form.Select onChange={e => setSelectedCategory(e.target.value)} className="form-control">
             { categories.map((cat, index) => (
                <option key={index} value={cat.value}>{cat.label}</option>
             ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Tag</Form.Label>
            <MultiSelect
              options={tags}
              value={selectedTags}
              onChange={setSelectedTags}
              labelledBy="Select"
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleFormControlTextarea1">Post Content</label>
            <textarea className="form-control" name="body" id="exampleFormControlTextarea1" rows={15}></textarea>
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

export default CreateArticleForm;