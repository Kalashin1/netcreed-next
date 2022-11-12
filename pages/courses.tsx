import { NextPage } from "next";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseComponent from "../components/Course-Component";
import { useContext } from 'react';
import { ThemeContext } from './_app';
import { getCourses } from "../helper";
import { CourseSchema } from "../types";


export async function getServerSideProps() {

  const [courses, err] = await getCourses();
  if (err) {
    console.log(err);
  }
  return {
    props: {
      courses
    }, // will be passed to the page component as props
  }
}

//@ts-ignore
const Courses: NextPage = ({ courses }) => {

  let theme: string = useContext(ThemeContext).theme;
  const arr = [1, 2, 3, 4];
  return (
    <Layout>
      <Container className="my-4">
        <h3 className={`display-4 text-${theme === "dark" ? "light" : "dark"}`}>Courses</h3>
        <Row className="justify-content-center">
          {courses && courses.map((course: CourseSchema, index: number) => (
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

export default Courses;