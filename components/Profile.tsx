import { useEffect, useState, useContext, FC } from 'react';
import { User, Article } from '../types';
import { Tab, Tabs, Card, Row, Col, Container, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import PersonalDetailsComponent from "./Personal-Details-Component";
const marked = require('marked');
import { ThemeContext } from "../pages/_app";
import Bio from "./Bio";
import ProfileHeader from "./Profile-Header";
import ProfileForm from "./Profile-Form";
import { getUserWithoutID } from "../helper";

import Image from 'next/image';

const UserProfile: FC = () => {

  const router = useRouter();

  let theme: string = useContext(ThemeContext).theme;

  const navigate = (route: string) => {
    router.push(route);
  }


  let _user: Partial<User> = {};
  let _article: Article[] = []

  const [user, setUser] = useState(_user);
  const [articles, setArticles] = useState(_article)
  const [key, setKey] = useState('home');


  useEffect(() => {
    const getUser = async () => {
      const [payload, err] = await getUserWithoutID();

      if (!err) {
        setArticles(payload?.articles!);
        setUser(payload?.user!);
      } else {
        console.log(err)
        if (err === 'Please login') {
          router.push('/login');
        }
      }
    }

    getUser()
  }, [])

  // const uploadImage = async (file: any) => {
  //   const extension = file.name;

  //   const key = randomBytes(16).toString('hex');
  //   const name = `${key}.${extension}`;
  //   localStorage.setItem('name', name);


  //   const storageRef = ref(storage)
  //   const articleImagesRef = ref(storageRef, `profile-photo/${name}`);

  //   const metadata = {
  //     contentType: file.type,
  //   };

  //   await uploadBytes(articleImagesRef, file, metadata);

  //   return await getDownloadURL(articleImagesRef);
  // }

  // async function getFile() {
  //   const pickerOpts = {
  //     types: [
  //       {
  //         description: 'Images',
  //         accept: {
  //           'image/*': ['.png', '.gif', '.jpeg', '.jpg']
  //         }
  //       },
  //     ],
  //     excludeAcceptAllOption: true,
  //     multiple: false
  //   };
  //   try {
  //     // @ts-ignore
  //     const fileHandle = await window.showOpenFilePicker(pickerOpts);
  //     const file = await fileHandle[0].getFile()
  //     return [file, null]
  //   } catch (error: any) {
  //     return [null, error.message];
  //   }

  // }

  // const uploadProfilePhoto = async (userId: string) => {
  //   //@ts-ignore
  //   let [file, err] = await getFile();
  //   console.log(file, err)

  //   if (err) {
  //     // @ts-ignore
  //     const input = fileInput.current!

  //     input.click();
  //     input.onchange = async (e: Event) => {
  //       try {
  //         file = input.files![0]
  //         // console.log(file)
  //         const url = await uploadImage(file);

  //         await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
  //         await updateProfile(auth.currentUser!, { photoURL: url });
  //         alert('Profile Photo updated successfully!')
  //         getUser()
  //       } catch (error: any) {
  //         console.log(error.message)
  //       }
  //     };
  //   } else {
  //     const url = await uploadImage(file);

  //     await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
  //     await updateProfile(auth.currentUser!, { photoURL: url });
  //     alert('Profile Photo updated successfully!')
  //     getUser()
  //   }
  // }


  // const _updateProfile = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, userId: string) => {
  //   e.preventDefault()
  //   setShowSpinner(true);
  //   try {
  //     const { username, phone, headline, github, twitter, linkedin, reddit } = form;
  //     const payload = {
  //       username: username.value,
  //       phone: phone.value,
  //       headline: headline.value,
  //       github: github.value,
  //       twitter: twitter.value,
  //       linkedin: linkedin.value,
  //       reddit: reddit.value,
  //     }
  //     await updateDoc(doc(db, 'users', userId), payload);
  //     setShowSpinner(false);
  //     alert('Your profile has been updated successfully!')
  //     router.reload()
  //   } catch (error) {
  //     setShowSpinner(false);
  //     console.log(error)
  //   }
  // }

  // const updateBio = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, userId: string) => {
  //   e.preventDefault()
  //   setShowSpinner2(true);
  //   try {
  //     const { bio } = form;
  //     const payload = {
  //       bio: bio.value,
  //     }
  //     await updateDoc(doc(db, 'users', userId), payload);
  //     setShowSpinner2(false);
  //     alert('Your bio has been updated successfully!')
  //     router.reload();
  //   } catch (error) {
  //     setShowSpinner2(false);
  //     // console.log(error)
  //   }
  // }

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
                showEditBUtton={false} />
            )}
            {
              user && (
                <PersonalDetailsComponent username={user.username!} github={user.github!} twitter={user.twitter!} email={user.email!} phone={user.phone!} />)
            }
          </Col>
          <Col lg={8} md={12}>
            <Card bg={theme} className={`text-${theme === "dark" ? "light" : "dark"}`}>
              <div className="padding-20">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k!)}
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Bio">
                    <div className="tab-pane fade show active container my-4" id="about" role="tabpanel" aria-labelledby="home-tab2">

                      <p className="m-t-30">
                        {user && user.bio}
                      </p>

                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Update Profile">
                    <div className="my-4 px-4">
                      {user && (
                        <ProfileForm
                          userID={user.id!}
                        />)
                      }
                    </div>
                  </Tab>
                  <Tab eventKey="contact" title="Update Bio">
                    <div className="my-4 px-4">
                      { user && (
                        <Bio 
                          userID={user.id!}
                        />
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Card>

            <div>
              {user.creator && (<Button variant="primary" className="my-4" type="submit" style={{ width: '100%' }}
                onClick={(e: any) => navigate(`/post/create`)}
              >
                Create Post
              </Button>)}
              {user.creator && (<h5 className="font-weight-bold spanborder my-4"><span>Posts From {user.name}</span></h5>)}
              {articles && articles.map((article, index) => (
                <div key={index} className="mb-3 sm-d-flex justify-content-between">
                  <Card bg={theme} className={`p-4 text-${theme === "dark" ? "light" : "dark"}`}>
                    <h2 className={`mb-4 h4 font-weight-bold text-${theme === "dark" ? "light" : "dark"}`}>
                      <a style={{ cursor: 'pointer' }} onClick={(e: any) => { e.preventDefault(); navigate(`/post/${article.id}`) }}>{article.title}</a>
                    </h2>
                    <p onClick={(e: any) => navigate(`/post/${article.id}`)} style={{ cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: marked.marked(article.description) }}>

                    </p>
                    <div className="card-text text-muted small"
                      style={{ cursor: 'pointer' }}
                      onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                    >
                      {article.author.name}
                    </div>
                    <small className="text-muted">{new Date(article.createdAt).toDateString()} · {article.readingTimeInMins} min read</small>
                  </Card>

                </div>
              ))}

              <div>
                {user.creator && (<Button variant="primary" className="my-4" type="submit" style={{ width: '100%' }}
                  onClick={(e: any) => navigate(`/post-dashboard`)}
                >
                  More Posts
                </Button>)}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserProfile;