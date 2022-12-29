import { NextPage } from 'next';
import Layout from '../Layout';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import CourseLessonHeader from '../../components/Course-Lesson-Header';
import { ThemeContext } from '../_app';
import { useContext } from 'react';
import { getCourse, getLessonsByCourseId } from '../../helper';
import { LessonSchema } from '../../types';
import { useRouter } from 'next/router';

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const [course, err] = await getCourse(id);

  if (err) {
    console.log(err);
  }

  const [lessons, lessonErr] = await getLessonsByCourseId(id);
  console.log(lessons);

  if (lessonErr) {
    console.log(lessonErr);
  }
  return {
    props: { course, lessons },
  };
};

// @ts-ignore
const Course: NextPage = ({ course, lessons }) => {
  let theme = useContext(ThemeContext).theme;
  const router = useRouter();
  return (
    <Layout>
      <Container className="my-4">
        <h3
          className={`my-4 display-6 text-${
            theme === 'dark' ? 'light' : 'dark'
          }`}
        >
          {course.title}
        </h3>
        <Row className="justify-content-center">
          <Col md={5}>
            <Container
              className={`px-2 text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <p>{course.description}</p>
              <ListGroup
                variant="flush"
                className={`text-${
                  theme === 'dark' ? 'light' : 'dark'
                } bg-${theme}`}
              >
                {lessons &&
                  lessons.map((l: LessonSchema, index: number) => (
                    <ListGroup.Item
                      key={index}
                      className={`text-${
                        theme === 'dark' ? 'light' : 'dark'
                      } bg-${theme}`}
                    >
                      {l.title}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <Button onClick={() => {router.push(`/lessons/${lessons[0].id}`)}} style={{ width: '100%' }}>Start Course</Button>
            </Container>
          </Col>
          <Col md={7}>
            {lessons &&
              lessons.map((l: LessonSchema, i: number) => (
                <div className="my-2" key={i}>
                  <CourseLessonHeader
                    description={l.description}
                    title={l.title}
                  />
                </div>
              ))}
            <Button onClick={() => { router.push(`/lessons/${lessons[0].id}`)}} style={{ width: '100%' }}>Start Course</Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Course;
