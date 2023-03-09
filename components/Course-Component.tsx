import { Card, Button } from 'react-bootstrap';
import { FC, useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  description: string;
  price?: number;
  img: string;
  id: string;
  showDetails?: boolean;
  registeredUsers: string[];
};

const CourseComponent: FC<Props> = ({
  title,
  description,
  img,
  id,
  price,
  showDetails = false,
  registeredUsers,
}) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <Card.Img
        src={img}
        style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }}
        onClick={(e) => router.push(`/course/${id}`)}
      />
      <Card.Header onClick={(e) => router.push(`/course/${id}`)}>
        <Card.Title
          className="mb-1 h4 font-weight-bold"
          onClick={(e: any) => router.push(`/course/${id}`)}
        >
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {price && <p className="my-2">Price - ${price}</p>}
        <p className="my-2">{registeredUsers.length} Registered Users</p>
        {showDetails && <p className="my-2">You have earned $30,000</p>}
        <p className="my-2">{description.slice(0, 100)}...</p>
        <div className="my-2" onClick={(e) => router.push(`/course/${id}`)}>
          <Button onClick={(e) => router.push(`/course/${id}`)}>
            View Course
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseComponent;
