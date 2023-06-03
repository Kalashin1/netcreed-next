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
import Select from 'react-select';

const CreateLessonForm: React.FC = () => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const createLessonForm: MutableRefObject<HTMLFormElement | null> =
    useRef(null);

  const [courses, setCourses] = useState<CourseSchema[]>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [course, setCourse] = useState<any>();

  useEffect(() => {
    const _getCourses = async () => {
      const [_courses, err] = await getUserCourses(
        localStorage.getItem('userId')!,
        router
      );
      if (!err) {
        setCourses(_courses.map((c: CourseSchema) => {
          return {
            value: c.id,
            label: c.title
          }
        }));
      }

    };

    _getCourses();
  }, [router]);

  const createLesson = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    console.log(course)
    try {
      const [data, err] = await createLessonFormHandler(
        createLessonForm.current!,
        course?.value!
      );
      setShowSpinner(false);
      if (err) {
        console.log(err);
      } else if (data) {
        router.push(`/course/${course.value}`);
      }
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
              required
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
            <Select
              defaultValue={course}
              // @ts-ignore
              onChange={setCourse}
              options={courses}
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
              className="form-control"
              name="description"
              required
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
              required
              id="exampleFormControlTextarea1"
              rows={15}
            ></textarea>
          </Form.Group>

          <Form.Group>
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="exampleFormControlInput1"
            >
              Lesson Position
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
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
