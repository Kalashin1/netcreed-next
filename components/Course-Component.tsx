import { Card, Button } from "react-bootstrap";
import { FC, useContext } from 'react';
import { ThemeContext } from "../pages/_app";
import { useRouter } from "next/router";

type Props = {
  title: string;
  description: string;
  img: string;
  id: string;
}
const CourseComponent: FC<Props> = ({ title, description, img, id }) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  return (
    <Card bg={theme} className={`text-${theme === "dark"? "light": "dark"}`}>
      <Card.Img src={img} style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }} />
      <Card.Header>
        <Card.Title className="mb-1 h4 font-weight-bold">
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="my-4">{ description }</p>
        <div className="my-2" onClick={e => router.push(`/courses/${id}`)}>
          <Button>
            View Course
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
};

export default CourseComponent;