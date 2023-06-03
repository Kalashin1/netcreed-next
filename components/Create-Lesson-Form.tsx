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
import { getUserCourses, createLessonFormHandler, getLessonsByCourseId } from '../helper';
import { CourseSchema } from '../types';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone'

const CreateLessonForm: React.FC = () => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const createLessonForm: MutableRefObject<HTMLFormElement | null> =
    useRef(null);

  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [lessonPosition, setLessonPosition] = useState(0);
  const [showNextPage, updateShowNextPage] = useState(false);

  type SelectOption = {
    value: string;
    label: string;
  };

  const [course, setCourse] = useState<SelectOption>({} as SelectOption);

  const getSelectedCourse = async (courseId: string, courseTitle: string) => {
    const [course, error] = await getLessonsByCourseId(courseId);
    if (error) {
      // alert(`opps`)
      console.log(error)
    } else if (course) {
      setLessonPosition(course.length + 1);
      setCourse({
        value: courseId,
        label: courseTitle
      })
    }
  }

  useEffect(() => {

    const selectCourse = ({ value, label }: SelectOption) => {
      getSelectedCourse(value, label);
    }

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
        selectCourse({
          value: _courses[0].id,
          label: _courses[0].title
        })
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
        course?.value!,
        lessonPosition
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
          <Form.Group className="my-4">
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
          <Form.Group className="my-4">
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              Select Course
            </Form.Label>
            <Select
              defaultValue={course}
              // @ts-ignore
              onChange={(selectedOption) => getSelectedCourse(selectedOption.value, selectedOption.label)}
              options={courses}
            />
          </Form.Group>

          <Form.Group className="my-4">
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

          <Form.Group className="my-4">
            <Form.Label
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
              htmlFor="lessonPosition"
            >
              Lesson Position
            </Form.Label>
            <Form.Control
              type="number"
              name="position"
              required
              value={lessonPosition}
              onChange={(e) => setLessonPosition(Number(e.target.value))}
              className="form-control"
              id="lessonPosition"
            />
          </Form.Group>

          {
            showNextPage ? (
              <Button variant="primary" type="submit">
                Next
              </Button>
            ): (<></>)}

          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            {showSpinner && (
              <Spinner animation="border" role="status"></Spinner>
            )}
            {!showSpinner && 'Create Lesson'}
          </Button>
        </Form>
      </div>
    </Container >
  );
};

export default CreateLessonForm;
