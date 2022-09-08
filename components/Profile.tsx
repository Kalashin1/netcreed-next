import { NextComponentType } from "next"
import { useEffect, useState, FormEvent, useRef, MutableRefObject } from 'react';
import { db, auth, storage } from '../Firebase-settings';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth'
import { User } from '../types';
import { randomBytes } from "crypto";
import { Tab, Tabs, Form, Button, Spinner } from 'react-bootstrap';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRouter } from "next/router";
import PersonalDetailsComponent from "./Personal-Details-Component";
import Image from 'next/image';

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
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', userId)
        console.log(userId)
        let userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const user: Partial<User> = userDoc.data()!
          user.id = userDoc.id;
          console.log(user);
          setUser(user);
        }
      } else {
        router.push('/login');
      }
    }

    getUser();
  }, [])

  const uploadImage = async (file: any) => {
    const extension = file.name;

    const key = randomBytes(16).toString('hex');
    const name = `${key}.${extension}`;
    localStorage.setItem('name', name);


    const storageRef = ref(storage)
    const articleImagesRef = ref(storageRef, `profile-photo/${name}`);

    const metadata = {
      contentType: file.type,
    };

    await uploadBytes(articleImagesRef, file, metadata);

    return await getDownloadURL(articleImagesRef);
  }

  const uploadProfilePhoto = async (userId: string ) => {
    const pickerOpts = {
      types: [
        {
          description: 'Images',
          accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
          }
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false
    };
    // @ts-ignore
    const fileHandle = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle[0].getFile()
    console.log(fileHandle, file)
    const url = await uploadImage(file);

    console.log(url);
    await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
    await updateProfile(auth.currentUser!, { photoURL: url });
    alert('Profile Photo updated successfully!')
    router.reload()
  }


  const _updateProfile = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement, userId: string) => {
    e.preventDefault()
    setShowSpinner(true);
    try {
      const { username, phone, headline, github, twitter, linkedin, reddit } = form;
      const payload = {
        username: username.value,
        phone: phone.value,
        headline: headline.value,
        github: github.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
        reddit: reddit.value,
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
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img
                    alt={user.name}
                    src={user.profilePhoto!} 
                    width={100}
                    height={100}
                    className="rounded-circle author-box-picture"
                  />

                  <div className="clearfix"></div>
                  <div style={{ position: 'relative', top: '-7rem', right: '-6rem', cursor: 'pointer'}} onClick={e => uploadProfilePhoto(userId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                </div>
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
                  <a href="#" className="btn btn-social-icon mr-1 btn-facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-github">
                  <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                  </a>
                  <a href="#" className="btn btn-social-icon mr-1 btn-instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"/></svg>
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
                        {user && user.bio}
                      </p>

                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Update Profile">
                    <div className="my-4 px-4">
                      <Form name="userProfileForm" ref={profileForm}
                        onSubmit={e => _updateProfile(e, profileForm.current!, userId)}>

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
                        
                        <Form.Group className="mb-3" controlId="linkedIn">
                          <Form.Label>Linkedin</Form.Label>
                          <Form.Control type="text" name="linkedin" required placeholder="Enter your Linkedin link" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="reddit">
                          <Form.Label>Reddit</Form.Label>
                          <Form.Control type="text" name="reddit" required placeholder="Enter your reddit username" />
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
  );
};

export default UserProfile;