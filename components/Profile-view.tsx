/* eslint-disable @next/next/no-img-element */
import { FC, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import PersonalDetailsComponent from './Personal-Details-Component';
import { Article, User as IUser, Author } from '../types';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { GithubIcon, LinkedinIcon, TwitterIcon, DevIcon, FavoriteOutlined, SaveOutlined } from './svg/icons';
import {
  getUserEngagements,
  engageUser,
  getAllUserArticles,
  getProfile,
} from '../helper';
import { Plus } from './svg/plus';
const marked = require('marked');

type UserPropsType = {
  user: Partial<IUser>;
  articles: Array<Article>;
};

const ViewUserProfile: FC<UserPropsType> = ({ user, articles }) => {
  let theme: string = useContext(ThemeContext).theme;

  const [followers, setFollowers] = useState<Author[]>([]);
  const [following, setFollowing] = useState<Author[]>([]);
  const [userArticlesLength, setUserArticlesLength] = useState(0);

  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };

  const _engageUser = async () => {
    const [type, [, otherUserEngagement], err] = await engageUser(
      user.id!,
      'FOLLOW'
    );
    if (type) {
      setFollowers(otherUserEngagement);
    } else if (err) {
      console.log(err);
    }
  };

  const fetchUserEngagements = async (id: string) => {
    const { followers, following } = await getUserEngagements(id);
    const user = await getProfile(id);
    setFollowers(followers);
    setFollowing(following);
    const { total } = await getAllUserArticles(user);
    setUserArticlesLength(total);
  };

  useEffect(() => {
    fetchUserEngagements(user.id!);
  }, [user.id]);

  return (
    <div className="section">
      <Container className="section-body">
        <Row className="mt-sm-4">
          <Col md={12} lg={4}>
            <Card
              className={`author-box text-${
                theme === 'dark' ? 'light' : 'dark'
              }`}
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
                    <p>{user.bio?.slice(0, 20)}...</p>
                  </div>
                  <div className="mb-2 mt-3">
                    <div className="text-small font-weight-bold">
                      Follow {user.name} On
                    </div>
                  </div>
                  <a
                    href={`https://linkedin.com/in/${user.linkedin}`}
                    className="btn btn-social-icon mr-1 btn-facebook"
                  >
                    <LinkedinIcon />
                  </a>
                  <a
                    href={`https://twitter.com/${user.twitter}`}
                    className="btn btn-social-icon mr-1 btn-twitter"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href={`https://github.com/${user.github}`}
                    className="btn btn-social-icon mr-1 btn-github"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href={`https://dev.to/${user.dev}`}
                    className="btn btn-social-icon mr-1 btn-instagram"
                  >
                    <DevIcon />
                  </a>
                  <div className="w-100 d-sm-none"></div>
                  <Button
                    onClick={(e) => _engageUser()}
                    variant={`${theme === 'dark' ? 'light' : 'dark'}`}
                    className="mt-4 d-flex justify-content-between"
                    style={{ width: '100%' }}
                  >
                    <div className="mx-1">Follow</div> {<Plus />}
                  </Button>
                  <ListGroup variant="flush" className="my-4">
                    <ListGroup.Item
                      onClick={(e) => router.push(`/user/followers/${user.id}`)}
                      className={`text-${
                        theme === 'dark' ? 'light' : 'dark'
                      } bg-${theme} d-flex justify-content-between`}
                    >
                      <p>{followers.length}</p>
                      <p>followers</p>
                    </ListGroup.Item>
                    <ListGroup.Item
                      onClick={(e) => router.push(`/user/following/${user.id}`)}
                      className={`text-${
                        theme === 'dark' ? 'light' : 'dark'
                      } bg-${theme} d-flex justify-content-between`}
                    >
                      <p>{following.length}</p>
                      <p>Following</p>
                    </ListGroup.Item>
                    <ListGroup.Item
                      onClick={(e) => router.push(`/user/articles/${user.id}`)}
                      className={`text-${
                        theme === 'dark' ? 'light' : 'dark'
                      } bg-${theme} d-flex justify-content-between`}
                    >
                      <p>{userArticlesLength}</p>
                      <p>Articles</p>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Card.Body>
            </Card>
            {user && (
              <PersonalDetailsComponent
                username={user.username!}
                github={user.github!}
                twitter={user.twitter!}
                email={user.email!}
                phone={user.phone!}
              />
            )}
          </Col>
          <Col md={12} lg={8}>
            <Card
              className={`mb-4 text-${theme === 'dark' ? 'light' : 'dark'}`}
              bg={theme}
            >
              <div className="padding-20">
                <Card.Header>
                  <h4>About {user.name}</h4>
                </Card.Header>
                <p className="px-4 py-4">{user && user.bio}</p>
              </div>
            </Card>

            <div>
              <h5 className="font-weight-bold spanborder">
                <span>Posts From {user.name}</span>
              </h5>
              {articles &&
                articles.map((article, index) => (
                  <div
                    key={index}
                    className="mb-3 sm-d-flex justify-content-between"
                  >
                    <Card
                      className={`p-4 text-${
                        theme === 'dark' ? 'light' : 'dark'
                      }`}
                      bg={theme}
                    >
                      <h2 className="my-4 h4 font-weight-bold">
                        <a
                          onClick={(e: any) => {
                            e.preventDefault();
                            navigate(`/post/${article.id}`);
                          }}
                        >
                          {article.title}
                        </a>
                      </h2>
                      <p
                        onClick={(e: any) => navigate(`/post/${article.id}`)}
                        dangerouslySetInnerHTML={{
                          __html: marked.marked(article.description),
                        }}
                      ></p>
                      <div
                        className="card-text text-muted small"
                        onClick={(e: any) =>
                          navigate(`/profile/${article.author.id}`)
                        }
                      >
                        {article.author.name}
                      </div>
                      <small className="text-muted">
                        {new Date(article.createdAt).toDateString()} ·{' '}
                        {article.readingTimeInMins} min read
                      </small>
                      <div className="d-flex justify-content-between w-50">
                      <span className="mr-4 d-flex align-items-center"><FavoriteOutlined /><span
                        className={`mx-2 lead text-${theme === 'light' ? 'dark' : 'light'
                          }`}
                      >
                        {article.likes.length}
                      </span></span>
                      <span className="mr-4 d-flex align-items-center"><SaveOutlined /><span
                        className={`mx-2 lead text-${theme === 'light' ? 'dark' : 'light'
                          }`}
                      >
                        {article.saves.length}
                      </span></span>
                    </div>
                    </Card>
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewUserProfile;
