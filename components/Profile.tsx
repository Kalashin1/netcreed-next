import { useEffect, useState, useContext, FC } from 'react';
import { User, Article, Author } from '../types';
import { Tab, Tabs, Card, Row, Col, Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PersonalDetailsComponent from './Personal-Details-Component';
const marked = require('marked');
import { ThemeContext } from '../pages/_app';
import Bio from './Bio';
import ProfileHeader from './Profile-Header';
import ProfileForm from './Profile-Form';
import { FavoriteOutlined, SaveOutlined } from './svg/icons';
import {
  getUserWithoutID,
  getUserEngagements,
  getAllUserArticles,
  getProfile,
} from '../helper';

// import Image from 'next/image';

const UserProfile: FC = () => {
  const router = useRouter();

  let theme: string = useContext(ThemeContext).theme;

  const navigate = (route: string) => {
    router.push(route);
  };

  let _user: Partial<User> = {};
  let _article: Article[] = [];

  const [user, setUser] = useState(_user);
  const [articles, setArticles] = useState(_article);
  const [key, setKey] = useState('home');

  const [followers, setFollowers] = useState<Author[]>([]);
  const [following, setFollowing] = useState<Author[]>([]);
  const [userArticlesLength, setUserArticlesLength] = useState(0);

  const fetchUserEngagements = async (id: string) => {
    const { followers, following } = await getUserEngagements(id);
    const user = await getProfile(id);
    setFollowers(followers);
    setFollowing(following);
    const { total } = await getAllUserArticles(user);
    setUserArticlesLength(total);
  };

  useEffect(() => {
    const setUp = async () => {
      const [payload, err] = await getUserWithoutID();

      if (!err) {
        setArticles(payload?.articles!);
        setUser(payload?.user!);
        fetchUserEngagements(payload?.user?.id!);
      } else if (err && err === 'Please login') {
        window.location.replace('/login');
      } else if (err && err !== 'Please login') {
        console.log(err);
      }
    };

    setUp();
  }, []);

  return (
    <section className="section">
      <Container className="section-body">
        <Row className="mt-sm-4">
          <Col md={12} lg={4}>
            {user && (
              <ProfileHeader
                bio={user.bio!}
                name={user.name!}
                twitter={user.twitter!}
                linkedin={user.linkedin!}
                github={user.github!}
                profilePhoto={user.profilePhoto!}
                headline={user.headline!}
                id={user.id!}
                dev={user.dev ? user.dev : ''}
                followers={followers ?? []}
                following={following && following}
                articlesLength={userArticlesLength}
              />
            )}
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
          <Col lg={8} md={12}>
            <Card
              bg={theme}
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <div className="padding-20">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k!)}
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Bio">
                    <div
                      className="tab-pane fade show active container my-4"
                      id="about"
                      role="tabpanel"
                      aria-labelledby="home-tab2"
                    >
                      <p className="m-t-30">{user && user.bio}</p>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Update Profile">
                    <div className="my-4 px-4">
                      {user && <ProfileForm userID={user.id!} />}
                    </div>
                  </Tab>
                  <Tab eventKey="contact" title="Update Bio">
                    <div className="my-4 px-4">
                      {user && <Bio userID={user.id!} />}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Card>

            <div>
              {user.creator && (
                <Button
                  variant="primary"
                  className="mb-2 mt-4"
                  type="submit"
                  style={{ width: '100%' }}
                  onClick={(e: any) => navigate(`/post/create`)}
                >
                  Create Post
                </Button>
              )}
              <Button
                variant="secondary"
                className="my-2"
                type="submit"
                style={{ width: '100%' }}
                onClick={(e: any) => navigate(`/course/create`)}
              >
                Create Course
              </Button>
              <h5 className="font-weight-bold span border my-4">
                <span>Posts From {user?.name}</span>
              </h5>
              {articles &&
                articles.map((article, index) => (
                  <div
                    key={index}
                    className="mb-3 sm-d-flex justify-content-between"
                  >
                    <Card
                      bg={theme}
                      className={`p-4 text-${
                        theme === 'dark' ? 'light' : 'dark'
                      }`}
                    >
                      <h2
                        className={`mb-4 h4 font-weight-bold text-${
                          theme === 'dark' ? 'light' : 'dark'
                        }`}
                      >
                        <a
                          style={{ cursor: 'pointer' }}
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
                        style={{ cursor: 'pointer' }}
                        dangerouslySetInnerHTML={{
                          __html: marked.marked(article.description),
                        }}
                      ></p>
                      <div
                        className="card-text text-muted small"
                        style={{ cursor: 'pointer' }}
                        onClick={(e: any) =>
                          navigate(`/profile/${article.author.id}`)
                        }
                      >
                        {article.author.name}
                      </div>
                      <small className="text-muted">
                        {new Date(article.createdAt).toDateString()} ·{' '}
                        {Math.floor(article.readingTimeInMins)} min read
                      </small>
                      <div className="d-flex justify-content-between w-50">
                        <span className="mr-4 d-flex align-items-center">
                          <FavoriteOutlined />
                          <span
                            className={`mx-2 lead text-${
                              theme === 'light' ? 'dark' : 'light'
                            }`}
                          >
                            {article.likes.length}
                          </span>
                        </span>
                        <span className="mr-4 d-flex align-items-center">
                          <SaveOutlined />
                          <span
                            className={`mx-2 lead text-${
                              theme === 'light' ? 'dark' : 'light'
                            }`}
                          >
                            {article.saves.length}
                          </span>
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}

              <div>
                <Button
                  variant="primary"
                  className="my-4"
                  type="submit"
                  style={{ width: '100%' }}
                  onClick={(e: any) => navigate(`/user/posts`)}
                >
                  More Posts
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserProfile;
