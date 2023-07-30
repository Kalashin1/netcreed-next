import { NextPage } from 'next';
import Layout from '../Layout';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Card
} from 'react-bootstrap';
import CourseLessonHeader from '../../components/Course-Lesson-Header';
import { ThemeContext, AuthContext, fontFamily } from '../_app';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import {
  getCourse,
  getLessonsByCourseId,
  hasUserPaidForCourse,
  getRegisteredCourses,
  registerCourse,
  getRegisteredCourseRef,
  deleteLesson,
} from '../../helper';
import { CourseSchema, LessonSchema, StudentCourseRef, User } from '../../types';
import { useRouter } from 'next/router';
import { MoneyFormatter } from '../../helper';
import { UsersIcon, DollarIcon, EditIcon, TimesIcon } from '@components/svg/icons';

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
  const { getLoggedInUser } = useContext(AuthContext);

  const [userId, setUserId] = useState<string>();
  const [isUserReg, updateIsUserReg] = useState(false)
  const [currentUser, updateCurrentUser] = useState<any>()

  const [courseRef, setCourseRef] = useState<CourseSchema>()

  useEffect(() => {
    const checkIfUserIsReg = async (id: string) => {
      if (getLoggedInUser) {
        const user = await getLoggedInUser(id);
        if (user) {
          updateCurrentUser(user)
          console.log(user);
        }
      }
      const [courses, err] = await getRegisteredCourses(id);
      if (err && !courses) {
        console.log(err)
      }
      console.log(courses)
      const foundCourse: CourseSchema = courses.find(
        (_course: CourseSchema) => _course.id === course.id
      );

      if (foundCourse) {
        updateIsUserReg(true)
        const [courseRef, err] = await getRegisteredCourseRef(id, foundCourse?.id!);
        console.log("courseRef", courseRef);
        if (err && !courseRef) {
          console.log(err)
        }
        setCourseRef(courseRef)
        console.log('foundCourse', foundCourse);
      }
    }
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
      checkIfUserIsReg(id);
    } else {
      router.push('/login');
    }
  }, [router, course.id, getLoggedInUser]);

  const openCourse = async (id?: string) => {
    if (course.isPaid) {
      const [bool, err] = await hasUserPaidForCourse(course.id!);
      if (err && err.includes('Please login')) {
        alert(err);
        router.push('/login');
      }
      if (!err && bool) {
        if (isUserReg) router.push(
          `/lessons/${courseRef?.currentLesson?.id ? courseRef?.currentLesson?.id : lessons[0].id}`
        );
      } else if (!err && !bool) {
        router.push(`checkout/${course.id}`);
      }
    } else {
      if (!isUserReg) {
        const [payload, err] = await registerCourse(course?.id!);
        if (err) {
          console.log(err);
        } else {
          console.log(payload);
        }
      }
      router.push(`/lessons/${id ? id : courseRef?.currentLesson?.id}`);
    };
  };

  const _deleteLesson = async (id: string) => {
    if (confirm("Do you want to delete this lesson?")) {
      const [bool, err] = await deleteLesson(id);
      if (err) {
        alert('opps something happened')
      } else if (bool) {
        alert("lesson deleted");
        router.reload();
      }
    }
  }

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
        <meta name="twitter:title" content={course?.title} />
        <meta name="twitter:site" content="@netcreed" />
        <meta name="twitter:creator" content="@netcreed" />
        <meta name="twitter:description" content={course?.description} />
        <meta name="twitter:image" content={course?.coverPhoto} />
        {/* Open Graph  */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.thenetcreed.com/course/${course?.id}`}
        />
        <meta property="og:title" content={course?.title} />
        <meta property="og:description" content={course?.description} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${course?.photoUrl}`}
        />
      </Head>
      <Container className="my-4">
        <h3
          className={`my-4 display-4 text-${theme === 'dark' ? 'light' : 'dark'
            }`}
        >
          {course?.title}
        </h3>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Container
              className={`px-2 text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <p>{course?.description}</p>
              <p>
                <span className="mx-2">
                  <DollarIcon />
                </span>
                Price - {MoneyFormatter.format(course?.price ?? 0)}</p>
              <p>
                <span className='mx-2'>
                  <UsersIcon />
                </span>
                {course?.registeredUsers?.length ?? 0} Registered Users.
              </p>
              <h4 className={`text-${theme === 'dark' ? 'light' : 'dark'
                } ml-2 my-4`}>Course Outline</h4>
              <ListGroup
                variant="flush"
                style={{ borderRadius: '3rem' }}
                className={`my-2 text-${theme === 'dark' ? 'black' : 'white'
                  }`}
              >
                {lessons &&
                  lessons.map((l: LessonSchema, index: number) => (
                    <ListGroup.Item
                      key={index}
                      className={`text-${theme === 'dark' ? 'light' : 'dark'} bg-${theme}`}
                    >
                      <Row>
                        <Col xs={8}>
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              router.push(`/lessons/${l.id}`);
                            }}>{l.title}</span>
                        </Col>
                        {currentUser && currentUser.uid === course?.author?.id && (<Col xs={1}>
                          <span style={{ cursor: 'pointer' }} onClick={() => router.push(`/lessons/edit/${l.id}`)}>
                            <EditIcon />
                          </span>
                        </Col>)}
                        {currentUser && currentUser.uid === course?.author?.id && (<Col xs={1}>
                          <span style={{ cursor: 'pointer' }} onClick={() => _deleteLesson(l.id!)}>
                            <TimesIcon fill="red" width={12} />
                          </span>
                        </Col>)}
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              {userId === course?.author?.id ? (
                <Button
                  onClick={() => {
                    router.push('/lessons/create');
                  }}
                  className="my-2"
                  style={{ width: '100%', fontFamily }}
                >
                  Add Lesson
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    openCourse(lessons[0].id);
                  }}
                  className="my-2"
                  style={{ width: '100%', fontFamily }}
                >
                  {isUserReg ? 'Continue Course' : 'Start Course'}
                </Button>
              )}
            </Container>
          </Col>
          <Col md={6}>
            {lessons &&
              lessons.map((l: LessonSchema, i: number) => (
                <div className="my-2" key={i}>
                  <CourseLessonHeader
                    description={l.description}
                    title={l.title}
                    courseCreatorId={course.author.id}
                    id={l.id}
                    openCourse={openCourse}
                  />
                </div>
              ))}
            {
              userId === course?.author?.id ? (
                <Button
                  onClick={() => {
                    router.push(`/course/edit/${course?.id}`);
                  }}
                  style={{ width: '100%', fontFamily }}
                >
                  Edit Course
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    openCourse();
                  }}
                  style={{ width: '100%', fontFamily }}
                >
                  {isUserReg ? 'Continue Course' : 'Start Course'}
                </Button>
              )
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Course;
