/* eslint-disable @next/next/no-img-element */
import { FC, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ThemeContext } from "../pages/_app";

const NotificationsComponent: FC = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light': 'dark'}`}>
      <Card.Header>
        <Card.Title>Notification Title</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col lg={2}>
            {/**  eslint-disable-next-line @next/next/no-img-element **/ }
            <img
              alt="notification"
              src="https://unsplash.com/photos/WNoLnJo7tS8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bWFufGVufDB8fHx8MTY2ODUzMTAyOQ&force=true&w=640"
              width={50}
              height={50}
              style={{ objectFit: 'cover' }}
              className="rounded-circle author-box-picture"
            />
          </Col>
          <Col lg={10}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit pretium ornare.
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default NotificationsComponent;