import { NextPage } from "next";
import Layout from "../../Layout";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import NotificationsComponent from "../../../components/Notifcation";
import { useContext } from "react";
import { ThemeContext } from "../../_app";

const Notification: NextPage = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Layout>
      <div>
        <div className="m-4">
          <h3 className={`my-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
            Notifications
          </h3>
        </div>
        <Container>
          <Row>
            <Col lg={4}>
              <ListGroup
                variant="flush"
                className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}
              >
                <ListGroup.Item className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}>All</ListGroup.Item>
                <ListGroup.Item className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}>Posts</ListGroup.Item>
                <ListGroup.Item className={`text-${theme === 'dark' ? 'light' : 'dark'
                  } bg-${theme}`}
                  >Messages</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={8}>
              <NotificationsComponent />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
};

export default Notification;