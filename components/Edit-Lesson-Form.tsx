import { Container, Form, Button, Spinner } from 'react-bootstrap';
import {
  useContext,
  MutableRefObject,
  useRef,
  useEffect,
  useState,
  FormEvent,
  FC
} from 'react';
import { ThemeContext } from '../pages/_app';
import { getCourses, editLessonFormHandler, getLesson } from '../helper';
import { CourseSchema, LessonSchema } from '../types';
import { useRouter } from 'next/router';

type Props = {
  lessonId: string;
};

const EditLessonForm: FC<Props> = ({ lessonId }) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const editLessonForm: MutableRefObject<HTMLFormElement | null> = useRef(null);

  const [courses, setCourses] = useState<CourseSchema[]>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [course, setCourse] = useState('');
  const [lesson, setLesson] = useState<LessonSchema>({} as LessonSchema);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const _getCourses = async () => {
      const [_courses, err] = await getCourses();
      const [_lesson, _err] = await getLesson(lessonId);
      if (!err) {
        setCourses(_courses!);
        if (!_err) {
          console.log(_lesson);
          setLesson(_lesson!);
        }
        _err && console.log(_err);
      }
      err && console.log(err);
    };

    _getCourses();
  }, []);

  const editLesson = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const [data, err] = await editLessonFormHandler(
        { title, description, content }!,
        course,
        lessonId
      );
      setShowSpinner(false);
      if (err) {
        console.log(err);
      } else if (data) {
        console.log(data);
        router.push(`/lessons/${course}`);
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
          ref={editLessonForm}
          onSubmit={(e) => editLesson(e)}
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
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={lesson?.title}
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
              <option value={lesson?.courseId} style={{ display: 'none' }}>
                default
              </option>
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
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={lesson?.description}
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
              onChange={(e) => setContent(e.target.value)}
              defaultValue={lesson?.courseContent}
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

export default EditLessonForm;
