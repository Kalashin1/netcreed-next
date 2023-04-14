import { NextPage } from 'next';
import Layout from '../Layout';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import CourseLessonHeader from '../../components/Course-Lesson-Header';
import { ThemeContext } from '../_app';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import {
  getCourse,
  getLessonsByCourseId,
  hasUserPaidForCourse,
} from '../../helper';
import { LessonSchema } from '../../types';
import { useRouter } from 'next/router';
import { MoneyFormatter } from '../../helper';

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const [course, err] = await getCourse(id);

  if (err) {
    console.log(err);
  }

  const [lessons, lessonErr] = await getLessonsByCourseId(id);

  if (lessonErr) {
    console.log(lessonErr);
  }
  return {
    props: { course, lessons },
  };
};

// @ts-ignore
const Course: NextPage<{ course: CourseSchema; lessons: LessonSchema[] }> = ({
  course,
  lessons,
}) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('userId')!;
    setUserId(id);
  }, []);

  const openCourse = async () => {
    if (course.isPaid) {
      const [bool, err] = await hasUserPaidForCourse(course.id!);
      if (err && err.includes('Please login')) {
        alert(err);
        router.push('/login');
      }
      if (!err && bool) {
        router.push(`/lessons/${lessons[0].id}`);
      } else if (!err && !bool) {
        router.push(`checkout/${course.id}`);
      }
    } else router.push(`/lessons/${lessons[0].id}`);
  };
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
          content={course.title
            .split(' ')
            .map((t: any) => t.value)
            .join(', ')}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content={course?.author?.name} />
        {/* TWITTER CARD  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={course.title} />
        <meta name="twitter:site" content="@netcreed" />
        <meta name="twitter:creator" content="@netcreed" />
        <meta name="twitter:description" content={course.description} />
        <meta name="twitter:image" content={course.coverPhoto} />
        {/* Open Graph  */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.thenetcreed.com/course/${course.id}`}
        />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.description} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${course.photoUrl}`}
        />
      </Head>
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
              <p>Price - {MoneyFormatter.format(course.price ?? 0)}</p>
              <p>{course?.registeredUsers?.length ?? 0} Registered Users.</p>
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
                      onClick={() => {
                        router.push(`/lessons/${l.id}`);
                      }}
                      className={`text-${
                        theme === 'dark' ? 'light' : 'dark'
                      } bg-${theme}`}
                    >
                      {l.title}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              {userId === course?.author?.id && (
                <Button
                  onClick={() => {
                    router.push('/lessons/create');
                  }}
                  style={{ width: '100%' }}
                >
                  Add Lesson
                </Button>
              )}
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
            <Button
              onClick={() => {
                openCourse();
              }}
              style={{ width: '100%' }}
            >
              Start Course
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Course;
