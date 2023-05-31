import { NextPage } from 'next';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import LessonHeader from '../../components/Lesson-Header';
import LessonContent from '../../components/Lesson-Content';
import Layout from '../Layout';
import { ThemeContext } from '../_app';
import Head from 'next/head';
import { getLesson, getLessonsByCourseId, getCourse } from '../../helper';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { CourseSchema, LessonSchema } from '../../types';

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

  const [course, courseErr] = await getCourse(_lesson?.courseId!);

  if (courseErr) console.log(courseErr);
  return {
    props: { lesson: _lesson, lessons, course },
  };
};

// @ts-ignore
const Lesson: NextPage<{
  lesson: LessonSchema;
  lessons: LessonSchema[];
  course: CourseSchema;
}> = ({ lesson, lessons, course }) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Layout>
      <Head>
        <meta name="title" content="Netcreed, Software Development" />
        <meta
          name="description"
          content="Software development platform for FullStack Development, JavaScript Development and Mobile Development"
        />
        <meta
          name="keywords"
          content={lesson.title
            .split(' ')
            .map((t: any) => t.value)
            .join(', ')}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content={course.author.name} />
        {/* TWITTER CARD  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={lesson.title} />
        <meta name="twitter:site" content="@netcreed" />
        <meta name="twitter:creator" content="@netcreed" />
        <meta name="twitter:description" content={lesson.description} />
        <meta name="twitter:image" content={course.photoUrl} />
        {/* Open Graph  */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.thenetcreed.com/lessons/${lesson.id}`}
        />
        <meta property="og:title" content={lesson.title} />
        <meta property="og:description" content={lesson.description} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${course.photoUrl}`}
        />
      </Head>
      <Container className="my-4">
        <h3 className={`display-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          {course?.title}
        </h3>
        <Row className="justify-content-between">
          <Col md={12}>
            <div className="my-4">
              <LessonHeader {...lesson} />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between">

          <Col md={8}>
            <div className="m-2">
              <LessonContent content={lesson?.courseContent} />
            </div>
          </Col>

          <Col md={4}>
            <Container
              className={`px-2 text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <h4 className='ml-2'>Course Outline</h4>
              <ListGroup
                variant="flush"
                className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}
              >
                {lessons &&
                  lessons.map((l: LessonSchema, index: number) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => {
                        router.push(`/lessons/${l.id}`);
                      }}
                      className={`text-${theme === 'dark' ? 'light' : 'dark'
                        } bg-${theme}`}
                    >
                      {l.title}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Container>
          </Col>
        </Row>
        {/* <Row className="my-4">
          <Col>
            <Button>Previous Lesson</Button>
          </Col>
          <Col>
            <Button>Next Lesson</Button>
          </Col>
        </Row> */}
      </Container>
    </Layout>
  );
};

export default Lesson;
