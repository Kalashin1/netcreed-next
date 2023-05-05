import { NextPage } from 'next';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import {
  useContext,
  MutableRefObject,
  useRef,
  useEffect,
  useState,
  FormEvent,
} from 'react';
import { ThemeContext } from '../pages/_app';
import { getUserCourses, createLessonFormHandler } from '../helper';
import { CourseSchema } from '../types';
import { useRouter } from 'next/router';

const CreateLessonForm: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const createLessonForm: MutableRefObject<HTMLFormElement | null> =
    useRef(null);

  const [courses, setCourses] = useState<CourseSchema[]>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [course, setCourse] = useState('');

  useEffect(() => {
    const _getCourses = async () => {
      const [_courses, err] = await getUserCourses(
        localStorage.getItem('userId')!,
        router
      );
      if (!err) {
        setCourses(_courses!);
      }
    };

    _getCourses();
  }, [router]);

  const createLesson = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const [data, err] = await createLessonFormHandler(
        createLessonForm.current!,
        course
      );
      setShowSpinner(false);
      if (err) {
        console.log(err);
      } else if (data) {
        console.log(data);
      }
      router.push(`/course/${course}`);
    } catch (error: any) {
      setShowSpinner(true);
      console.log(error);
    }
  };

  return (
    <Container>
      <div>
        <Form
          name="articleForm"
          ref={createLessonForm}
          onSubmit={(e) => createLesson(e)}
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
              name="title"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              Select Course
            </Form.Label>
            <Form.Select
              name="courses"
              onChange={(e) => setCourse(e.target.value)}
            >
              {courses &&
                courses.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.title}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlTextarea1"
            >
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </Form.Group>

          <Form.Group>
            <label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlTextarea1"
            >
              Lesson Content
            </label>
            <textarea
              className="form-control"
              name="content"
              id="exampleFormControlTextarea1"
              rows={15}
            ></textarea>
          </Form.Group>

          <div className="my-4 flex">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              {showSpinner && (
                <Spinner animation="border" role="status"></Spinner>
              )}
              {!showSpinner && 'Create Lesson'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreateLessonForm;
