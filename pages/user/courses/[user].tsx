import Layout from '../../Layout';
import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../../_app';
import { CourseSchema } from '../../../types';
import CourseComponent from '../../../components/Course-Component';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getUserCourses } from '../../../helper';

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
    },
  };
};

const UserCourses = ({ courses }: { courses: CourseSchema[] }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Layout>
      <Container
        className={`my-4 bg-${theme} text-${
          theme === 'dark' ? 'light' : 'dark'
        }`}
      >
        <h3 className={`display-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          Courses
        </h3>
        <Row className="justify-content-center">
          {courses &&
            courses.map((course: CourseSchema, index: number) => (
              <Col md={6} key={index}>
                <div className="my-4">
                  <CourseComponent
                    description={course.description}
                    id={course.id!}
                    img={course.photoUrl}
                    title={course.title}
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
