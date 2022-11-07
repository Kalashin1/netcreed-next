import { NextPage } from "next";
import Layout from "../Layout";
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import CourseLessonHeader from '../../components/Course-Lesson-Header';
import { ThemeContext } from '../_app';
import { useContext } from "react";

const Course: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  const courseLessons = [0, 2, 4, 5, 8, 9];
  return (
    <Layout>
      <Container className="my-4">
        <h3 className={`my-4 display-6 text-${theme === "dark" ? "light": "dark"}`}>Intro To JavaScript</h3>
        <Row className="justify-content-center">
          <Col md={5}>
            <Container className={`px-2 text-${theme === "dark" ? "light": "dark"}`}>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, montes euismod penatibus convallis rhoncus inceptos eu tincidunt, fringilla non pretium volutpat vestibulum sagittis</p>
              <ListGroup variant="flush" className={`text-${theme === "dark" ? "light": "dark"} bg-${theme}`}>
                <ListGroup.Item className={`text-${theme === "dark" ? "light": "dark"} bg-${theme}`}>Cras justo odio</ListGroup.Item>
                <ListGroup.Item className={`text-${theme === "dark" ? "light": "dark"} bg-${theme}`}>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item className={`text-${theme === "dark" ? "light": "dark"} bg-${theme}`}>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Button style={{ width: '100%' }}>
                Start Course
              </Button>
            </Container>
          </Col>
          <Col md={7}>
            {courseLessons.map((c, i) => (
              <div className="my-2" key={i}>
                <CourseLessonHeader />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Course;