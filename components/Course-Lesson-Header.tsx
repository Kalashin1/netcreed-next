import { Card, Row, Col } from 'react-bootstrap';
import { FC, useContext, useEffect } from 'react';
import { ThemeContext, AuthContext } from '../pages/_app';
import { EditIcon, DeleteIcon } from './svg/icons'
import { useRouter } from 'next/router';

type Props = {
  title: string;
  description: string;
  id?: string;
  courseCreatorId?: string;
  openCourse: (id?: string) => void
};

const CourseLessonHeader: FC<Props> = ({ title, description, courseCreatorId, id, openCourse }) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;
  let { user, getLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    if (getLoggedInUser) getLoggedInUser();
  }, [getLoggedInUser])

  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <Card.Header>
        <Row className="justify-content-between align-items-center flex-row">
          <Col sm={10}>
            <Card.Title onClick={() => openCourse(id)} style={{ cursor: 'pointer' }} className="mb-1 h4 font-weight-bold">{title}</Card.Title>
          </Col>
          {/* Update Icon */}
          {
            user?.uid === courseCreatorId ?
            (<Col sm={2}>
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
      <Card.Body onClick={() => openCourse(id)} style={{ cursor: 'pointer' }}>
        <p className="my-4">{description}</p>
      </Card.Body>
    </Card>
  );
};

export default CourseLessonHeader;
