import { NextComponentType } from 'next';
import { FC, useContext } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';
const marked = require('marked');
import { ThemeContext } from '../pages/_app';
import { Container, Col, Row, Card } from 'react-bootstrap';

type Articles = {
  articles: Article[];
};

const AlikePost: FC<Articles> = ({ articles }) => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter();

  function navigate(route: string) {
    router.push(route);
  }
  return (
    <Container className="pt-4 pb-4">
      <h5
        className={`font-weight-bold spanborder text-${
          theme === 'light' ? 'dark' : 'light'
        }`}
      >
        <span>Read next</span>
      </h5>
      <Row>
        <Col lg={6}>
          {[articles[0], articles[5]].map((article, index) => (
            <Card
              bg={theme}
              className={`border-0 mb-4 box-shadow text-${
                theme === 'light' ? 'dark' : 'light'
              }`}
              key={index}
            >
              <div
                style={{
                  backgroundImage: `url(${article?.coverPhoto})`,
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  cursor: 'pointer',
                }}
                onClick={(e: any) => navigate(`/posts/${article?.id}`)}
              ></div>
              <Card.Body className="d-flex flex-column align-items-start">
                <h2
                  className={`h4 font-weight-bold`}
                  style={{ cursor: 'pointer' }}
                  onClick={(e: any) => navigate(`/posts/${article?.id}`)}
                >
                  {article?.title}
                </h2>

                <div>
                  <small className="d-block">
                    <a
                      className="text-muted"
                      style={{ cursor: 'pointer' }}
                      onClick={(e: any) =>
                        navigate(`/profile/${articles[0]?.author.id}`)
                      }
                    >
                      {articles[0]?.author.name}
                    </a>
                  </small>
                  <small className="text-muted">
                    {new Date(articles[0]?.createdAt).toDateString()} ·{' '}
                    {Math.floor(articles[0]?.readingTimeInMins)} min read
                  </small>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col lg={6}>
          <div className="flex-md-row mb-4">
            {articles &&
              articles.slice(1, 3).map((article, index) => (
                <Card
                  bg={theme}
                  className={`p-4 my-4 text-${
                    theme === 'light' ? 'dark' : 'light'
                  }`}
                  key={index}
                >
                  <Card.Title className="mb-1 h4 font-weight-bold">
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={(e: any) => {
                        e.preventDefault();
                        navigate(`/post/${article.id}`);
                      }}
                    >
                      {article.title}
                    </a>
                  </Card.Title>
                  <p
                    onClick={(e: any) => navigate(`/post/${article.id}`)}
                    dangerouslySetInnerHTML={{
                      __html: marked.marked(article.description),
                    }}
                    style={{ cursor: 'pointer' }}
                  ></p>
                  <div
                    className="card-text text-muted small"
                    onClick={(e: any) =>
                      navigate(`/profile/${article.author.id}`)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {article.author.name}
                  </div>
                  <small className="text-muted">
                    {new Date(article.createdAt).toDateString()} ·{' '}
                    {article.readingTimeInMins} min read
                  </small>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AlikePost;
