import { Container, Row, Col } from 'react-bootstrap';
import CreateQuestionForm from '../../../components/Question-Form';
import Layout from '../../Layout';
import { useContext } from 'react';
import { ThemeContext } from '../../_app';
import React from 'react';
import { LessonSchema } from '../../../types';
import { getLesson } from '../../../helper';

export const getServerSideProps = async (context: any) => {
  const { lesson } = context.query;
  const [_lesson, err] = await getLesson(lesson);

  return {
    props: { lesson: _lesson },
  };
};

const CreateQuestion:React.FC<{ lesson: LessonSchema }> = ({
  lesson
}) => {
  let theme: string = useContext(ThemeContext).theme;
  console.log(lesson)
  return (
    <Layout>
      <div>
        <div className="text-center my-4">
          <h3 className={`my-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
            Add a question
          </h3>
        </div>
        <Row className="justify-content-center">
          <Col md={12}>
            { lesson && (<CreateQuestionForm lessonId={lesson?.id!} />)}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default CreateQuestion;
