import { FC, useState, useRef, MutableRefObject, FormEvent } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import { _updateProfile } from "../helper"
import { useRouter } from 'next/router';

type Props = {
  userID: string
}


const ProfileForm: FC<Props> = ({ userID }) => {
  const router = useRouter()
  
  const [showSpinner, setShowSpinner] = useState(false);
  const profileForm: MutableRefObject<HTMLFormElement | null> = useRef(null)


  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    setShowSpinner(true)
    e.preventDefault();
    const [res, err] = await _updateProfile(profileForm.current!, userID);
    setShowSpinner(false)
    if (!err) {
      alert(res)
      router.reload();
    } else {
      console.log(err);
    }
  }

  return (
    <Form name="userProfileForm" ref={profileForm}
    onSubmit={e => updateProfile(e)}>

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
      <Form.Label>DEV</Form.Label>
      <Form.Control type="text" name="dev" required placeholder="Enter your reddit username" />
    </Form.Group>


    <Button variant="primary" type="submit" style={{ width: '100%' }}>
      {showSpinner && (<Spinner animation="border" role="status">
      </Spinner>)}
      {!showSpinner && 'Save Information'}
    </Button>
  </Form>
  )
}

export default ProfileForm;