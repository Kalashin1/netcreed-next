/* eslint-disable @next/next/no-img-element */
import { FC, MutableRefObject, useContext, useRef } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { uploadProfilePhoto } from '../helper';
import { NextRouter, useRouter } from 'next/router';
import { ThemeContext } from '../pages/_app';
import { Author } from '../types';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './svg/icons';

type Props = {
  name: string;
  profilePhoto: string;
  headline: string;
  id: string;
  bio: string;
  linkedin: string;
  twitter: string;
  github: string;
  dev: string;
  followers: Author[];
  following: Author[];
  articlesLength: number;
};

const uploadPhoto = async (
  id: string,
  fileInput: MutableRefObject<HTMLInputElement | null>,
  router: NextRouter
) => {
  const [res, _err] = await uploadProfilePhoto(id, fileInput.current!);
  if (!_err) {
    alert(res);
    router.reload();
  } else {
    console.log(_err);
  }
};

const ProfileHeader: FC<Props> = ({
  name,
  profilePhoto,
  id,
  headline,
  bio,
  linkedin,
  twitter,
  github,
  dev,
  followers,
  following,
  articlesLength,
}) => {
  const profilePhotoForm: MutableRefObject<null | HTMLFormElement> =
    useRef(null);
  const fileInput: MutableRefObject<null | HTMLInputElement> = useRef(null);

  const router = useRouter();

  let theme: string = useContext(ThemeContext).theme;
  return (
    <Card
      bg={theme}
      className={`author-box text-${theme === 'dark' ? 'light' : 'dark'}`}
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
            alt={name}
            src={profilePhoto!}
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
            className="rounded-circle author-box-picture"
          />

          <div className="clearfix"></div>
          <form ref={profilePhotoForm}>
            <input
              type="file"
              ref={fileInput}
              style={{ display: 'none' }}
              name="profile-photo"
            />
          </form>

          <div
            style={{
              position: 'relative',
              top: '-7rem',
              right: '-6rem',
              cursor: 'pointer',
            }}
            onClick={(e) => uploadPhoto(id, fileInput, router)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill={`${theme === 'dark' ? '#fff' : '#000'}`}
              viewBox="0 0 576 512"
            >
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
            </svg>
          </div>
          <div className="author-box-name">
            <a href="#">{name}</a>
          </div>
          <small className="author-box-job my-2">{headline}</small>
        </div>

        <div className="text-center">
          <div className="author-box-description text-justify">
            <p>{bio?.slice(0, 100)}...</p>
          </div>
          <div className="mb-2 mt-3">
           {twitter === 'kinanee_samson' && (<Button
              onClick={() => router.push(`/user/courses/${id}`)}
              style={{ cursor: 'pointer' }}
              className="w-100 btn-warning my-4 text-small font-weight-bold"
            >
              Your Courses
            </Button>)}
            <Button
              onClick={() => router.push(`/user/courses/registered/${id}`)}
              style={{ cursor: 'pointer' }}
              className="w-100 btn-secondary text-small font-weight-bold mb-4"
            >
              Registered Courses
            </Button>
            <Button
              onClick={() => router.push(`/user/reading_list/${id}`)}
              style={{ cursor: 'pointer' }}
              className="w-100 btn-primary text-small font-weight-bold"
            >
              Reading List
            </Button>
          </div>
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            className="btn btn-social-icon mr-1 btn-facebook"
          >
            <LinkedinIcon width={22} />
          </a>
          <a
            href={`https://twitter.com/${twitter}`}
            className="btn btn-social-icon mr-1 btn-twitter"
          >
            <TwitterIcon width={22} />{' '}
          </a>
          <a
            href={`https://github.com/${github.toLowerCase()}`}
            className="btn btn-social-icon mr-1 btn-github"
          >
            <GithubIcon width={22} />
          </a>

          <div className="w-100 d-sm-none"></div>
          <ListGroup variant="flush" className="my-4">
            <ListGroup.Item
              onClick={(e) => router.push(`/user/followers/${id}`)}
              className={`text-${
                theme === 'dark' ? 'light' : 'dark'
              } bg-${theme} d-flex justify-content-between`}
            >
              <p>{followers.length}</p>
              <p>followers</p>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={(e) => router.push(`/user/following/${id}`)}
              className={`text-${
                theme === 'dark' ? 'light' : 'dark'
              } bg-${theme} d-flex justify-content-between`}
            >
              <p>{following.length}</p>
              <p>Following</p>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={(e) => router.push(`/user/articles/${id}`)}
              className={`text-${
                theme === 'dark' ? 'light' : 'dark'
              } bg-${theme} d-flex justify-content-between`}
            >
              <p>{articlesLength}</p>
              <p>Articles</p>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileHeader;
