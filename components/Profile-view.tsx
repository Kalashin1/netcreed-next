import { FC } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PersonalDetailsComponent from './Personal-Details-Component';
import Image from 'next/image';
import { Article, User as IUser } from '../types';
import { useRouter } from "next/router"
import Link from 'next/link';
import Categories from './Categories';
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
const marked = require('marked');

type UserPropsType = {
  user: Partial<IUser>,
  articles: Array<Article>
}

const ViewUserProfile: FC<UserPropsType> = ({ user, articles }) => {

  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();

  function navigate(route: string) {
    router.push(route);
  }

  return (
    <div className="section">
      <Container className="section-body">
        <Row className="mt-sm-4">
          <Col md={12} lg={4}>
            <Card className={`author-box text-${theme === "dark" ? "light": "dark"}`} bg={theme}>
              <Card.Body>
                <div className="author-box-center"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img
                    alt={user.name}
                    src={user.profilePhoto!}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    className="rounded-circle author-box-picture"
                  />

                  <div className="clearfix"></div>
                  <div className="author-box-name">
                    <a href="#">{user.name}</a>
                  </div>
                  <small className="author-box-job my-2">{user.headline}</small>
                </div>

                <div className="text-center">
                  <div className="author-box-description">
                    <p>
                      {user.bio?.slice(0, 20)}...
                    </p>
                  </div>
                  <div className="mb-2 mt-3">
                    <div className="text-small font-weight-bold">Follow {user.name} On</div>
                  </div>
                  <a href={`https://linkedin.com/in/${user.linkedin}`} className="btn btn-social-icon mr-1 btn-facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} fill={`${theme === "dark" ? '#fff': "#000"}`} viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>
                  </a>
                  <a href={`https://twitter.com/${user.twitter}`} className="btn btn-social-icon mr-1 btn-twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} fill={`${theme === "dark" ? '#fff': "#000"}`} viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>                  </a>
                  <a href={`https://github.com/${user.github}`} className="btn btn-social-icon mr-1 btn-github">
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} fill={`${theme === "dark" ? '#fff': "#000"}`} viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                  </a>
                  {/* <a href="#" className="btn btn-social-icon mr-1 btn-instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z" /></svg>
                  </a> */}
                  <div className="w-100 d-sm-none"></div>
                </div>
              </Card.Body>
            </Card>
            {
              user && (
                <PersonalDetailsComponent username={user.username!} github={user.github!} twitter={user.twitter!} email={user.email!} phone={user.phone!} />)
            }
          </Col>
          <Col md={12} lg={8}>
            <Card className={`mb-4 text-${theme === "dark" ? "light": "dark"}`} bg={theme}>
              <div className="padding-20">
                <Card.Header>
                  <h4>About {user.name}</h4>
                </Card.Header>
                <p className="px-4 py-4">
                  {user && user.bio}
                </p>
              </div>
            </Card>

            <div>
              <h5 className="font-weight-bold spanborder"><span>Posts From {user.name}</span></h5>
              {articles && articles.map((article, index) => (
                <div key={index} className="mb-3 sm-d-flex justify-content-between">
                  <Card className={`p-4 text-${theme === "dark" ? "light": "dark"}`} bg={theme}>
                    <h2 className="mb-1 h4 font-weight-bold">
                      <a onClick={(e: any) => { e.preventDefault();navigate(`/post/${article.id}`)}}>{article.title}</a>
                    </h2>
                    <p onClick={(e: any) => navigate(`/post/${article.id}`)} dangerouslySetInnerHTML={{ __html: marked.marked(article.description)}}>
                      
                    </p>
                    <div className="card-text text-muted small"
                      onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                    >
                      {article.author.name}
                    </div>
                    <small className="text-muted">{new Date(article.createdAt).toDateString()} · {article.readingTimeInMins} min read</small>
                  </Card>
                  
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ViewUserProfile;