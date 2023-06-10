import { Container, Form, Button, Spinner, Card } from 'react-bootstrap';
import {
  useContext,
  MutableRefObject,
  useRef,
  useEffect,
  useState,
  FormEvent,
  FC,
  useCallback,
} from 'react';
import { ThemeContext } from '../pages/_app';
import { getCourses, editLessonFormHandler, getLesson } from '../helper';
import { CourseSchema, LessonSchema } from '../types';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';

type Props = {
  lessonId: string;
};

type SelectOption = {
  value: string;
  label: string;
};

const EditLessonForm: FC<Props> = ({ lessonId }) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const editLessonForm: MutableRefObject<HTMLFormElement | null> = useRef(null);

  const [courses, setCourses] = useState<CourseSchema[]>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [course, setCourse] = useState('');
  const [lesson, setLesson] = useState<LessonSchema>({} as LessonSchema);
  const [showNextPage, updateShowNextPage] = useState(false);
  const [uploadedVideos, updateUploadedVideos] = useState<FileList>();
  const [lessonPosition, setLessonPosition] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const onDrop = useCallback((acceptedFiles: FileList) => {
    console.log(acceptedFiles)
    updateUploadedVideos(acceptedFiles)
    Array.from(acceptedFiles).forEach((file: any) => { })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    maxFiles: 1
  })

  useEffect(() => {
    const _getCourses = async () => {
      const [_courses, err] = await getCourses();
      const [_lesson, _err] = await getLesson(lessonId);
      if (!err) {
        setCourses(_courses!);
        if (!_err) {
          console.log(_lesson);
          setLesson(_lesson!);
          setCourse(_lesson?.courseId!)
          setTitle(_lesson?.title!);
          setDescription(_lesson?.description!);
          setContent(_lesson?.courseContent!);
          setLessonPosition(_lesson?.lessonPosition!);
        }
        _err && console.log(_err);
      }
      err && console.log(err);
    };

    _getCourses();
  }, [lessonId]);

  const editLesson = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const [data, err] = await editLessonFormHandler(
        { title, description, content },
        course,
        lessonId,
        lessonPosition,
        uploadedVideos,
      );
      setShowSpinner(false);
      if (err) {
        console.log(err);
      } else if (data) {
        console.log(data);
        router.push(`/course/${course}`);
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
          {!showNextPage ? (<>
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
                value={title}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
                value={content}
                name="content"
                id="exampleFormControlTextarea1"
                rows={15}
              ></textarea>
            </Form.Group>
          </>) : (
            <>
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

              <Form.Group className="my-4">
                <div {...getRootProps()}>
                  <input name="lessonPhoto" type="file" {...getInputProps()} />
                  {
                    isDragActive ?
                      (
                        <Card>
                          <Card.Body>
                            Drop Video Here
                          </Card.Body>
                        </Card>
                      ) :
                      (
                        <Card style={{ cursor: 'pointer' }} bg={theme === 'dark' ? 'black' : 'white'}>
                          <Card.Body>
                            <p className={`text-${theme === 'dark' ? 'light' : 'black'}`}>Add your video here</p>
                          </Card.Body>
                        </Card>
                      )
                  }
                </div>
              </Form.Group>
            </>
          )}

          {
            !showNextPage ? (
              <Form.Group>
                <Button onClick={(e) => {
                  e.preventDefault()
                  updateShowNextPage(true)
                }} variant="primary" className='my-4' type="button" style={{ width: '100%' }}>
                  Next
                </Button>
              </Form.Group>
            ) : (
              <Form.Group>
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                  {showSpinner && (
                    <Spinner animation="border" role="status"></Spinner>
                  )}
                  {!showSpinner && 'Edit Lesson'}
                </Button>
              </Form.Group>
            )}
        </Form>
      </div>
    </Container>
  );
};

export default EditLessonForm;
