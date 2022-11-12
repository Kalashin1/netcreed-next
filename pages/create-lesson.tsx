import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import CreateLessonForm from "../components/Create-Lesson-Form";
import Layout from "./Layout";
import { useContext } from 'react';
import { ThemeContext } from './_app';

const CreateLesson: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Layout>
      <div>
        <div className='text-center my-4'>
          <h3 className={`my-4 text-${theme === "dark"? "light": "dark"}`}>Create a new course</h3>
        </div>
        <Container className='my-4'>
          <Row className='justify-content-center'>
            <Col md={12}>
              <Container>
                <CreateLessonForm />
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default CreateLesson;