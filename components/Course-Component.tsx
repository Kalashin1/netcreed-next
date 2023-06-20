import { Card, Button } from 'react-bootstrap';
import { FC, useContext, useEffect, useState } from 'react';
import { ThemeContext, fontFamily } from '../pages/_app';
import { useRouter } from 'next/router';
import { DeleteIcon, DollarIcon, UsersIcon } from './svg/icons';
import { deleteCourse } from '../helper';

type Props = {
  title: string;
  description: string;
  price?: number;
  img: string;
  id: string;
  showDetails?: boolean;
  registeredUsers: string[];
  ownerId?: string;
};

const CourseComponent: FC<Props> = ({
  title,
  description,
  img,
  id,
  price,
  showDetails = false,
  registeredUsers,
  ownerId,
}) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  const _deleteCourse = async () => {
    const bool = confirm('are you sure you want to delete this course');
    if (bool) {
      const [res, err] = await deleteCourse(id);
      if (err) alert(err);
      alert('course deleted successfully!');
      router.reload();
    }
  };

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (ownerId === userId) updateShowDeleteIcon(true);
  }, [ownerId]);

  const [showDeleteIcon, updateShowDeleteIcon] = useState(false);
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
        {showDetails && <p className="my-2"><DollarIcon /> Price - ${price}</p>}
        {showDetails && (<p className="my-2"><UsersIcon /> {registeredUsers?.length ?? 0} Registered Users</p>)}
        {showDeleteIcon && (
          <p className="my-2">
            You have earned $
            {Math.floor((registeredUsers?.length ?? 0) * (price ?? 0))}
          </p>
        )}
        <p className="my-2">{description.slice(0, 100)}...</p>
        <div
          className="my-2 mt-4 d-flex justify-items-center justify-content-between"
          onClick={(e) => router.push(`/course/${id}`)}
        >
          <Button style={{ cursor: 'pointer', fontFamily}} onClick={(e) => router.push(`/course/${id}`)}>
            View Course
          </Button>
          {showDeleteIcon && (
            <div style={{ cursor: 'pointer' }} onClick={_deleteCourse}>
              <DeleteIcon fill='red' />
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseComponent;
