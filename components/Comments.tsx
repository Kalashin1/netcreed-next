import { FC } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { UserProfile } from '../types';
const marked = require('marked');
import EclipseVeritical from './svg/eclipse';
type Props = {
  body: string;
  owner: UserProfile;
};

const Comment: FC<Props> = ({ body, owner }) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Container>
      <Row>
        <Col lg={1}>
          <Image
            style={{ objectFit: 'contain' }}
            width={40}
            height={30}
            fluid
            roundedCircle
            src={owner.coverPhoto}
            alt="Title"
          />
        </Col>
        <Col xs={12} lg={11}>
          <div className="my-4 d-flex justify-content-end">
            <Dropdown drop="start">
              <Dropdown.Toggle
                variant={theme === 'dark' ? 'light' : 'dark'}
                id="dropdown-basic"
              >
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card bg={theme}>
            <Card.Body
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <p dangerouslySetInnerHTML={{ __html: marked.marked(body) }}></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
