import { NextPage } from 'next';
import Layout from '../Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CourseComponent from '../../components/Course-Component';
import { FormEvent, useContext, useState } from 'react';
import { ThemeContext } from './../_app';
import { getCourses } from '../../helper';
import { CourseSchema } from '../../types';
import { Reload } from '../../components/svg/icons';

export async function getServerSideProps() {
  const [courses, err] = await getCourses();
  if (err) {
    console.log(err);
  }
  return {
    props: {
      courses,
    }, // will be passed to the page component as props
  };
}

//@ts-ignore
const Courses: NextPage = ({ courses }) => {
  let theme: string = useContext(ThemeContext).theme;
  const textColor = theme === 'dark' ? 'light' : 'dark'


  const [initialCourses, setInitialCourses] = useState(courses);
  const [_courses, setCourses] = useState(courses);

  const [searchTerm, setSearchTerm] = useState('');

  const search = (e: FormEvent, title: string) => {
    e.preventDefault();
    console.log(title);
    const filteredPosts = courses.filter((course: CourseSchema) => course.title.includes(title));
    setCourses(filteredPosts);
  };

  const reload = async () => {
    setCourses(initialCourses);
  }

  return (
    <Layout>
      <Container
        className={`my-4 bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'
          }`}
      >
        <Row style={{ alignItems: 'center' }}>
          <Col md={4}>
            <h3 className={`display-4 text-${textColor}`}>
              Courses
            </h3>
          </Col>
          {/* <Col md={8}>
            <Form className="d-flex" onSubmit={e => search(e, searchTerm)}>
              <Form.Control
                type="search"
                placeholder="Search"
                defaultValue={searchTerm}
                onChange={v => setSearchTerm(v.target.value)}
                className={`me-2 bg-${theme} text-${textColor}`}
                aria-label="Search"
              />
              <Button variant={`outline-${textColor}`}>Search</Button>
              <Button
                onClick={reload}
                title="reload list of posts"
                className="btn btn-primary ml-2"
              >
                <Reload />
              </Button>
            </Form>
          </Col> */}
        </Row>

        <Row className="justify-content-center">
          {_courses &&
            _courses.map((course: CourseSchema, index: number) => (
              <Col md={6} key={index}>
                <div className="my-4">
                  <CourseComponent
                    description={course.description}
                    id={course.id!}
                    img={course.photoUrl}
                    title={course.title}
                    registeredUsers={course?.registeredUsers ?? []}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </Layout >
  );
};

export default Courses;
