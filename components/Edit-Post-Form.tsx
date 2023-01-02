import { MultiSelect } from 'react-multi-select-component';
import { useState, useRef, useEffect, MutableRefObject, FC } from 'react';
import { db } from '../Firebase-settings';
import { getDoc, doc } from '@firebase/firestore';
import { Article } from '../types';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { useRouter } from 'next/router';
import { Button, Spinner, Form, Container } from 'react-bootstrap';
import { tags, updateArticle, categories } from '../helper';

type _article = {
  id: string;
};

const EditArticleForm: FC<_article> = ({ id }) => {
  let theme: string = useContext(ThemeContext).theme;

  const [selectedTags, setSelectedTags] = useState([] as typeof tags);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [article, setArticle] = useState({} as Article);

  useEffect(() => {
    const getPost = async (id: string) => {
      const docRes = await getDoc(doc(db, 'articles', id));
      const article = { ...docRes.data(), id: docRes.id } as Article;
      console.log(article);
      setArticle(article);
      setSelectedTags(article.tags);
      setSelectedCategory(article.category);
      setTitle(article.title);
      setBody(article.body);
    };

    getPost(id);
  }, [id]);

  const router = useRouter();

  const updateArticleForm: MutableRefObject<null | HTMLFormElement> =
    useRef(null);

  const coverPhoto: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <Container className="container">
      <div>
        <Form
          name="articleForm"
          ref={updateArticleForm}
          onSubmit={(e) =>
            updateArticle(
              e,
              'saved',
              setShowSpinner,
              coverPhoto,
              article,
              { title, body, selectedTags, selectedCategory },
              router
            )
          }
        >
          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlInput1"
            >
              Title
            </Form.Label>
            <Form.Control
              type="text"
              name="articleName"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlFile1"
            >
              Select Cover Photo
            </Form.Label>
            <Form.Control
              type="file"
              name="coverPhoto"
              ref={coverPhoto}
              className="form-control"
              id="exampleFormControlFile1"
            />
          </Form.Group>
          <Form.Group>
            <label>Select Category</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              Select Tag
            </Form.Label>
            <MultiSelect
              options={tags}
              value={selectedTags}
              onChange={setSelectedTags}
              labelledBy="Select"
            />
          </Form.Group>
          <Form.Group>
            <label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlTextarea1"
            >
              Post Content
            </label>
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              name="body"
              id="exampleFormControlTextarea1"
              rows={8}
            ></textarea>
          </Form.Group>

          <div className="my-2 flex">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              {showSpinner && (
                <Spinner animation="border" role="status"></Spinner>
              )}
              {!showSpinner && 'Save Information'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditArticleForm;
