import { FC, useContext } from 'react';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { Article } from '../types';
import { useRouter } from 'next/router';
import { ThemeContext } from '../pages/_app';
import { FavoriteOutlined, SaveOutlined } from './svg/icons';
type Posts = {
  posts: Article[];
};

const RecentPosts: FC<Posts> = ({ posts }) => {
  const router = useRouter();
  let theme: string = useContext(ThemeContext).theme;

  const navigate = (route: string) => {
    router.push(route);
  };
  return (
    <div className="container pt-4 pb-4">
      <Row>
        <h5
          className={`font-weight-bold spanborder text-${
            theme === 'dark' ? 'light' : 'dark'
          }`}
        >
          <span>All Stories</span>
        </h5>
        {posts &&
          posts.map((post, index) => (
            <Col lg={6} key={index} className="my-2">
              <Container>
                <Card
                  bg={theme}
                  className={`text-${theme === 'light' ? 'dark' : 'light'}`}
                >
                  <Card.Img
                    style={{
                      cursor: 'pointer',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                    className="img-fluid"
                    src={post.coverPhoto}
                    alt="Card image"
                    onClick={(e: any) => navigate(`/post/${post.id}`)}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ cursor: 'pointer' }}
                      onClick={(e: any) => navigate(`/post/${post.id}`)}
                    >
                      {post.title}
                    </Card.Title>
                    {/* <Card.Text style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text> */}
                    <Card.Text
                      style={{ cursor: 'pointer' }}
                      className="card-text text-muted small"
                      onClick={(e: any) =>
                        navigate(`/profile/${post.author.id}`)
                      }
                    >
                      By {post.author.name}
                    </Card.Text>
                    <Card.Text>
                      {new Date(post.createdAt).toDateString()} &middot;{' '}
                      {Math.floor(post.readingTimeInMins)} mins
                    </Card.Text>
                    <div className="d-flex justify-content-between w-50">
                      <span className="mr-4 d-flex align-items-center">
                        <FavoriteOutlined />
                        <span
                          className={`mx-2 lead text-${
                            theme === 'light' ? 'dark' : 'light'
                          }`}
                        >
                          {post.likes.length}
                        </span>
                      </span>
                      <span className="mr-4 d-flex align-items-center">
                        <SaveOutlined />
                        <span
                          className={`mx-2 lead text-${
                            theme === 'light' ? 'dark' : 'light'
                          }`}
                        >
                          {post.saves.length}
                        </span>
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default RecentPosts;
