import { NextPage } from "next";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseComponent from "../components/Course-Component";

const Courses: NextPage = () => {
  const arr = [1, 2, 3, 4];
  return (
    <Layout>
      <Container className="my-4">
        <h3 className="display-4">Courses</h3>
        <Row className="justify-content-center">
          { arr.map((ar, i) => (
            <Col md={6} key={i}>
              <div className="my-4">
                <CourseComponent />
              </div>      
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Courses;