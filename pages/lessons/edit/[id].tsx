import { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import EditLessonForm from '../../../components/Edit-Lesson-Form';
import Layout from '../../Layout';
import { useContext } from 'react';
import { ThemeContext } from '../../_app';
import React from 'react';
import { useRouter } from 'next/router';

const EditLesson: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <div>
        <div className="text-center my-4">
          <h3 className={`my-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
            Edit Lesson
          </h3>
        </div>
        <Container className="my-4">
          <Row className="justify-content-center">
            <Col md={12}>
              <Container>
                {/** @ts-ignore */}
                {id && <EditLessonForm lessonId={id} />}
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default EditLesson;
