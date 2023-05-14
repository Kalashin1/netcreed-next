import { Container, Form, Button } from 'react-bootstrap';
import {
  useContext,
  useState,
  MutableRefObject,
  useRef,
  useEffect,
  FC,
  FormEvent,
} from 'react';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { ThemeContext } from '../pages/_app';
import { editCourseFormHandler, getCourse } from '../helper';
import { CourseSchema } from '../types';

type Props = {
  courseId: string;
};

const CreateCourseForm: FC<Props> = ({ courseId }) => {
  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [course, setCourse] = useState<CourseSchema>({} as CourseSchema);

  const editCourseForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  useEffect(() => {
    const setUp = async () => {
      const [course, err] = await getCourse(courseId);
      if (!err) {
        console.log(course)
        setCourse(course!);
        setTitle(course?.title!);
        setDescription(course?.description!);
      }
    };

    setUp();
  }, [courseId]);

  const updateCourse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    const [res, err] = await editCourseFormHandler(
      { title, description, price },
      courseId
    );
    if (res) {
      console.log(res);
      setShowSpinner(false);
      alert('course edited!');
      router.push(`/course/${courseId}`);
    } else if (err) {
      setShowSpinner(false);
      alert(err);
    }
  };

  return (
    <Container>
      <Form name="articleForm" ref={editCourseForm} onSubmit={updateCourse}>
        <Form.Group>
          <Form.Label
            className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            htmlFor="exampleFormControlInput1"
          >
            Title
          </Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            defaultValue={course?.title!}
            name="title"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label
            className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            htmlFor="price"
          >
            Price
          </Form.Label>
          <Form.Control
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="number"
            defaultValue={course?.price!}
            name="price"
            className="form-control"
            id="price"
            placeholder="3000"
          />
        </Form.Group>

        <Form.Group>
          <label
            className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            htmlFor="exampleFormControlTextarea1"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={course?.description!}
            className="form-control"
            name="description"
            id="exampleFormControlTextarea1"
            rows={5}
          ></textarea>
        </Form.Group>

        <div className="my-2 flex">
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            {showSpinner && (
              <Spinner animation="border" role="status"></Spinner>
            )}
            {!showSpinner && 'Create Article'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateCourseForm;
