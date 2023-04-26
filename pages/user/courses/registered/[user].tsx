import Layout from '../../../Layout';
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ThemeContext } from '../../../_app';
import { CourseSchema } from '../../../../types';
import CourseComponent from '../../../../components/Course-Component';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getUserCourses, getRegisteredCourses } from '../../../../helper';
import { Plus, GridIcon, ListIcon } from '../../../../components/svg/icons';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user } = context.query;
  const [courses, err] = await getRegisteredCourses(user as string);
  if (err) {
    throw err;
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
  console.log(courses)
  return (
    <Layout>
      <Container
        className={`my-4 bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'
          }`}
      >
        <Row className="justify-content-between">
          <Col md={6}>
            <h3
              className={`display-4 text-${theme === 'dark' ? 'light' : 'dark'
                }`}
            >
              Your registered Courses
            </h3>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {courses && courses.length > 0 &&
            courses.map((course: CourseSchema, index: number) => (
              <Col md={6} key={index}>
                <div className="my-4">
                  <CourseComponent
                    description={course.description}
                    id={course.id!}
                    img={course.photoUrl}
                    title={course.title}
                    price={course.price ?? 300}
                    registeredUsers={course?.registeredUsers!}
                    ownerId={''}
                  />
                </div>
              </Col>
            ))}

          {courses && courses.length < 1 && (
            <h3
              className={`text-center my-4 text-${theme === 'dark' ? 'light' : 'dark'
                }`}
            >
              You have not registered to any course yet.
            </h3>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default UserCourses;
