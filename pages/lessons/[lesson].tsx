import { NextPage } from 'next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LessonHeader from '../../components/Lesson-Header';
import LessonContent from '../../components/Lesson-Content';
import Layout from '../Layout';
import { ThemeContext } from '../_app';
import { getLesson, getLessonsByCourseId } from '../../helper';
import { useContext } from 'react';
import { LessonSchema } from '../../types';

export const getServerSideProps = async (context: any) => {
  const { lesson } = context.query;
  const [Lesson, err] = await getLesson(lesson);
  // const [lessons, _err] = await getLessonsByCourseId(Lesson.)
  if (err) {
    console.log(err);
  }
  return {
    props: { Lesson },
  };
}
// @ts-ignore
const Lesson: NextPage = ({ Lesson }: { Lesson: LessonSchema}) => {
  console.log(Lesson)
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Layout>
      <Container className="my-4">
        <h3 className={`display-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          Courses
        </h3>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="my-4">
              { Lesson && (<LessonHeader {...Lesson} />) }
            </div>
          </Col>
          <Col md={12}>
            <div className="m-4">
              { Lesson && (<LessonContent content={Lesson?.courseContent} />) }
            </div>
            <div className="m-4 d-flex justify-content-between">
              <Button>Prev Lesson</Button>
              <Button>Next Lesson</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Lesson;
