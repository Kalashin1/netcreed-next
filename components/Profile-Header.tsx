/* eslint-disable @next/next/no-img-element */
import { FC, MutableRefObject, useContext, useRef } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { uploadProfilePhoto } from '../helper';
import { NextRouter, useRouter } from 'next/router';
import { ThemeContext } from '../pages/_app';
import { Author } from '../types';

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
          <div className="author-box-description">
            <p>{bio?.slice(0, 20)}...</p>
          </div>
          <div className="mb-2 mt-3">
            <div
              onClick={() => router.push(`/user/reading_list/${id}`)}
              style={{ cursor: 'pointer' }}
              className="text-small font-weight-bold"
            >
              Reading List
            </div>
          </div>
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            className="btn btn-social-icon mr-1 btn-facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              fill={`${theme === 'dark' ? '#fff' : '#000'}`}
              viewBox="0 0 448 512"
            >
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
          </a>
          <a
            href={`https://twitter.com/${twitter}`}
            className="btn btn-social-icon mr-1 btn-twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              fill={`${theme === 'dark' ? '#fff' : '#000'}`}
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>{' '}
          </a>
          <a
            href={`https://github.com/${github}`}
            className="btn btn-social-icon mr-1 btn-github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              fill={`${theme === 'dark' ? '#fff' : '#000'}`}
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
          <a
            href={`https://dev.to/${dev}`}
            className="btn btn-social-icon mr-1 btn-instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              fill={`${theme === 'dark' ? '#fff' : '#000'}`}
              viewBox="0 0 448 512"
            >
              <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z" />
            </svg>
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
