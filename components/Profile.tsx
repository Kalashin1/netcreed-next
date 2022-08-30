import { NextComponentType } from "next"
import { useEffect, useState, FormEvent, useRef, MutableRefObject } from 'react';
import { db } from '../Firebase-settings';
import { getDoc, doc, updateDoc } from '@firebase/firestore';
import { User } from '../types';
import { Tab, Tabs, Form, Button, Spinner } from 'react-bootstrap';
import { useRouter } from "next/router";
import PersonalDetailsComponent from "./Personal-Details-Component";

const UserProfile: NextComponentType = () => {

  const router = useRouter();

  let userId: string;

  const profileForm: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const bioForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  let _user: Partial<User> = {};

  const [user, setUser] = useState(_user);
  const [key, setKey] = useState('home');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSpinner2, setShowSpinner2] = useState(false);

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!
  }
  useEffect(() => {
    const getUser = async () => {
      const userDocRef = doc(db, 'users', userId)
      console.log(userId)
      let userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const user: Partial<User> = userDoc.data()!
        user.id = userDoc.id;
        console.log(user);
        setUser(user);
      }
    }

    getUser();
  }, [])


  const updateProfile = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, userId: string) => {
    e.preventDefault()
    setShowSpinner(true);
    try {
      const { username, phone, headline, github, twitter } = form;
      const payload = {
        username: username.value,
        phone: phone.value,
        headline: headline.value,
        github: github.value,
        twitter: twitter.value
      }
      await updateDoc(doc(db, 'users', userId), payload);
      setShowSpinner(false);
      alert('Your profile has been updated successfully!')
      router.reload()
    } catch (error) {
      setShowSpinner(false);
      console.log(error)
    }
  }

  const updateBio = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, userId: string) => {
    e.preventDefault()
    setShowSpinner2(true);
    try {
      const { bio } = form;
      const payload = {
        bio: bio.value,
      }
      await updateDoc(doc(db, 'users', userId), payload);
      setShowSpinner2(false);
      alert('Your bio has been updated successfully!')
      router.reload();
    } catch (error) {
      setShowSpinner2(false);
      console.log(error)
    }
  }

  return (
    <section className="section">
      <div className="section-body container">
        <div className="row mt-sm-4">
          <div className="col-12 col-md-12 col-lg-4">
            <div className="card author-box">
              <div className="card-body">
                <div className="author-box-center"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                  <img alt="src" src="/assets/img/demo/avatar2.jpg" className="rounded-circle author-box-picture" />
                  <div className="clearfix"></div>
                  <div className="author-box-name">
                    <a href="#">{user.name}</a>
                  </div>
                  <small className="author-box-job my-2">{ user.headline }</small>
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
                  <a href="#" className="btn btn-social-icon mr-1 btn-facebook">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-github">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-instagram">
                    <i className="fab fa-reddit"></i>
                  </a>
                  <div className="w-100 d-sm-none"></div>
                </div>
              </div>
            </div>
            { 
              user && (
              <PersonalDetailsComponent username={user.username!} github={user.github!} twitter={user.twitter!} email={user.email!} phone={user.phone!} />)
            }
          </div>
          <div className="col-12 col-md-12 col-lg-8">
            <Button className="m-4 text-left" onClick={e => router.push('/create-post')} variant="primary" style={{ width: '80%'}}>
              Your Posts
            </Button>
            <div className="card">
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
                        { user && user.bio }
                      </p>

                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Update Profile">
                    <div className="my-4 px-4">
                      <Form name="userProfileForm" ref={profileForm}
                      onSubmit={e => updateProfile(e, profileForm.current!, userId)}>

                        <Form.Group className="mb-3" controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" name="username" required placeholder="Enter your username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Phone number</Form.Label>
                          <Form.Control type="text" name="phoneNumber" required placeholder="Enter your phone number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="headline">
                          <Form.Label>Headline</Form.Label>
                          <Form.Control type="text" name="headline" required placeholder="e.g React Developer | NodeJS" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="github">
                          <Form.Label>Github</Form.Label>
                          <Form.Control type="text" name="github" required placeholder="Enter your Github username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="twitter">
                          <Form.Label>Twitter</Form.Label>
                          <Form.Control type="text" name="twitter" required placeholder="Enter your Twitter username" />
                        </Form.Group>


                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                          {showSpinner && (<Spinner animation="border" role="status">
                          </Spinner>)}
                          {!showSpinner && 'Save Information'}
                        </Button>
                      </Form>
                    </div>
                  </Tab>
                  <Tab eventKey="contact" title="Update Bio">
                    <div className="my-4 px-4">
                      <Form name="bioForm" ref={bioForm} 
                      
                      onSubmit={e => updateBio(e, bioForm.current!, userId)}>
                        <Form.Group className="mb-3" controlId="text-area">
                          <Form.Label>Update Your Bio</Form.Label>
                          <Form.Control name="bio" as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                          {showSpinner2 && (<Spinner animation="border" role="status">
                          </Spinner>)}
                          {!showSpinner2 && 'Save Bio'}
                        </Button>
                      </Form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default UserProfile;