import { Card, Button } from 'react-bootstrap';
import { FC, useContext } from 'react';
import { ThemeContext } from '../pages/_app';

type Props = {
  title: string;
  description: string;
};

const CourseLessonHeader: FC<Props> = ({ title, description }) => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <Card.Header>
        <Card.Title className="mb-1 h4 font-weight-bold">{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="my-4">{description}</p>
      </Card.Body>
    </Card>
  );
};

export default CourseLessonHeader;
