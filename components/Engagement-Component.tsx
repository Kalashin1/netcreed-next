/* eslint-disable @next/next/no-img-element */
import { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../pages/_app';
import { User } from '../types';

type Props = {
  user: Partial<User>;
};

const EngagementComponent: FC<Props> = ({ user }) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Card
      className={`author-box text-${theme === 'dark' ? 'light' : 'dark'}`}
      bg={theme}
    >
      <Card.Body>
        <div
          className="author-box-center"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            alt={user.name}
            src={user.coverPhoto}
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
            className="rounded-circle author-box-picture"
          />

          <div className="clearfix"></div>
          <div className="author-box-name">
            <a href="#">{user.name}</a>
          </div>
          <small className="author-box-job my-2">{user.username}</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EngagementComponent;
