import { Card, Button } from "react-bootstrap";
import { FC, useContext } from 'react';
import { ThemeContext } from "../pages/_app";

const CourseLessonHeader: FC = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Card bg={theme} className={`text-${theme === "dark" ? "light": "dark"}`}>
      <Card.Header>
        <Card.Title className="mb-1 h4 font-weight-bold">
          Lesson 1
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="my-4">Lorem ipsum dolor sit amet consectetur adipiscing elit, montes euismod penatibus convallis rhoncus inceptos eu tincidunt, fringilla non pretium volutpat vestibulum sagittis.</p>
      </Card.Body>
    </Card>
  )
};

export default CourseLessonHeader;