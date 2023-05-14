import Layout from '../../Layout';
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ThemeContext } from '../../_app';
import { CourseSchema } from '../../../types';
import CourseComponent from '../../../components/Course-Component';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getUserCourses } from '../../../helper';
import { Plus, GridIcon, ListIcon } from '../../../components/svg/icons';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user } = context.query;
  const [courses, err] = await getUserCourses(user as string);
  if (err) {
    console.log(err);
  }
  return {
    props: {
      courses,
      user,
    },
  };
};

const UserCourses = ({
  courses,
  user,
}: {
  courses: CourseSchema[];
  user: string;
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Layout>
      <Container
        className={`my-4 bg-${theme} text-${
          theme === 'dark' ? 'light' : 'dark'
        }`}
      >
        <Row className="justify-content-between align-items-center">
          <Col md={6}>
            <h3
              className={`display-4 text-${
                theme === 'dark' ? 'light' : 'dark'
              }`}
            >
              Courses
            </h3>
          </Col>

          <Col md={6}>
            <Button>
              <Row style={{ alignItems: 'center' }}>
                <Col md={10}>
                  <span>Create New Course</span>
                </Col>
                <Col md={2}>
                  <span>
                    <Plus />
                  </span>
                </Col>
              </Row>
            </Button>
          </Col>
        </Row>

        <Row></Row>

        <Row className="justify-content-center">
          {courses &&
            courses.map((course: CourseSchema, index: number) => (
              <Col md={6} key={index}>
                <div className="my-4">
                  <CourseComponent
                    description={course.description}
                    showDetails={true}
                    id={course.id!}
                    img={course.photoUrl}
                    title={course.title}
                    price={course.price ?? 300}
                    registeredUsers={course?.registeredUsers!}
                    ownerId={user}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default UserCourses;
