import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import LessonHeader from "../components/Lesson-Header";
import LessonContent from "../components/Lesson-Content";
import Layout from "./Layout";

const Lesson: NextPage = () => {
  return (
    <Layout>
      <Container className="my-4">
        <h3 className="display-4">Courses</h3>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="my-4">
              <LessonHeader />
            </div>
          </Col>
          <Col md={12}>
            <div className="m-4">
              <LessonContent />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Lesson;