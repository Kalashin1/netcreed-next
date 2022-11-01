import { Card, Button } from "react-bootstrap";
import { FC } from 'react';

const CourseComponent: FC = () => {
  return (
    <Card>
      <Card.Img src="/assets/img/demo/blog4.jpg" style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }} />
      <Card.Header>
        <Card.Title className="mb-1 h4 font-weight-bold">
          Introduction To JavaScript
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="my-4">This is a description about this course.</p>
        <div className="my-2">
          <Button>
            View Course
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
};

export default CourseComponent;