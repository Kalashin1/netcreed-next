import { NextComponentType } from 'next';
import { MultiSelect } from 'react-multi-select-component';
import {
  useState,
  useRef,
  MutableRefObject,
  FormEvent,
  useContext,
} from 'react';
import { User as _User } from '../types';
import { useRouter } from 'next/router';
import { Button, Spinner, Form, Container } from 'react-bootstrap';
import { tags, categories, createArticleHandler } from '../helper';
import { ThemeContext } from '../pages/_app';

type SelectType = {
  label: string;
  value: string;
};

const CreateArticleForm: NextComponentType = () => {
  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();

  const createArticleForm: MutableRefObject<null | HTMLFormElement> =
    useRef(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <Container>
      <div>
        <Form
          name="articleForm"
          ref={createArticleForm}
          onSubmit={(e) =>
            createArticleHandler(
              e,
              createArticleForm.current!,
              'saved',
              setShowSpinner,
              selectedTags,
              selectedCategory,
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
              className="form-control"
              id="exampleFormControlFile1"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              Select Category
            </Form.Label>
            <Form.Select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
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
            <label htmlFor="exampleFormControlTextarea1">Post Content</label>
            <textarea
              className="form-control"
              name="body"
              id="exampleFormControlTextarea1"
              rows={15}
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

export default CreateArticleForm;
