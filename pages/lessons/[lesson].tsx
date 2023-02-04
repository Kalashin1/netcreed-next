import { NextPage } from 'next';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import LessonHeader from '../../components/Lesson-Header';
import LessonContent from '../../components/Lesson-Content';
import Layout from '../Layout';
import { ThemeContext } from '../_app';
import { getLesson, getLessonsByCourseId, getCourse } from '../../helper';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LessonSchema } from '../../types';

export const getServerSideProps = async (context: any) => {
  const { lesson } = context.query;
  const [_lesson, err] = await getLesson(lesson);

  if (err) {
    console.log(err);
  }


  const [lessons, lessonErr] = await getLessonsByCourseId(_lesson?.courseId!);


  if (lessonErr) {
    console.log(lessonErr);
  }

  const [course, courseErr] = await getCourse(_lesson?.courseId!)

  if(courseErr) console.log(courseErr)
  return {
    props: { lesson: _lesson, lessons, course },
  };
};

// @ts-ignore
const Lesson: NextPage = ({ lesson, lessons, course }) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Layout>
      <Container className="my-4">
        <h3 className={`display-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          {course?.title}
        </h3>
        <Row className="justify-content-between">
          <Col md={12}>
            <div className="my-4">
              <LessonHeader { ...lesson } />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between">
        <Col md={2}>
            <Container
              className={`px-2 text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <p>{course?.description}</p>
              <ListGroup
                variant="flush"
                className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}
              >
                {lessons &&
                  lessons.map((l: LessonSchema, index: number) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => { router.push(`/lessons/${l.id}`) }}
                      className={`text-${theme === 'dark' ? 'light' : 'dark'
                        } bg-${theme}`}
                    >
                      {l.title}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Container>
          </Col>
          <Col md={10}>
            <div className="m-2">
              <LessonContent content={lesson?.courseContent} />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Lesson;
