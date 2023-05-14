import { Card, Row, Col } from 'react-bootstrap';
import { FC, useContext } from 'react';
import { ThemeContext, AuthContext } from '../pages/_app';
import { EditIcon, DeleteIcon } from './svg/icons'
import { useRouter } from 'next/router';

type Props = {
  title: string;
  description: string;
  id?: string
  courseCreatorId?: string
};

const CourseLessonHeader: FC<Props> = ({ title, description, courseCreatorId, id }) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;
  let { user } = useContext(AuthContext);
  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <Card.Header>
        <Row className="justify-content-between align-items-center flex-row">
          <Col lg={10}>
            <Card.Title className="mb-1 h4 font-weight-bold">{title}</Card.Title>
          </Col>
          {/* // * Update Icon */}
          {
            user?.uid === courseCreatorId ?
            (<Col lg={1}>
              <span style={{ cursor: 'pointer'}} onClick={() => router.push(`/lessons/edit/${id}`)}><EditIcon /></span>
            </Col>
            ): (
              <></>
            )
          }
          {/* // * Delete Icon */}
          {/* {
            user?.uid === courseCreatorId ?
            (<Col lg={1}>
              <span style={{ cursor: 'pointer'}} onClick={() => {}}><DeleteIcon fill="red" /></span>
            </Col>
            ): (
              <></>
            )
          }
           */}
        </Row>
      </Card.Header>
      <Card.Body>
        <p className="my-4">{description}</p>
      </Card.Body>
    </Card>
  );
};

export default CourseLessonHeader;
