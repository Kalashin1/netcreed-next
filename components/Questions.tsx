import { Container, Row, Col, Card } from "react-bootstrap";
import { FC } from 'react';
import { CircleIcon } from "./svg/icons";

const Question: FC = () => {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Title className="m-4">Question 1</Card.Title>

            <Card.Body>
              <Card.Text>This is the question</Card.Text>

              <Row>
                <Col sm={6}>
                  <Card className={`p-2 my-2 border  rounded`}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col xs={10}>
                            <p>Lorem ipsum dolor sit amet</p>
                          </Col>
                          <Col xs={2}>
                            <span style={{ cursor: "pointer"}}>
                              <CircleIcon fill="lightgrey" width={12} />
                            </span>
                          </Col>
                        </Row>
                      </Container>

                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className={`p-2 my-2 border border-danger rounded`}>
                    <Card.Body>option 2</Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className={`p-2 my-2 border border-success rounded`}>
                    <Card.Body>option 3</Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="p-2 my-2 border border-secondary rounded">
                    <Card.Body>option 4</Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Question;