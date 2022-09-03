import { NextComponentType } from "next"
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { auth, db } from '../Firebase-settings';
import { createUserWithEmailAndPassword, sendEmailVerification, User, updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { Form, Button, Spinner } from "react-bootstrap";

const SignupForm: NextComponentType = () => {

  const router = useRouter();

  const registrationForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  const [inputType, setInputType] = useState('password');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
    if (showPassword) {
      setInputType('text')
    } else {
      setInputType('password');
    }
  }

  const createAccount = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const { fullName, email, password, confirmPassword } = form;
      const userPayload = {
        name: fullName.value,
        email: email.value.toLowerCase(),
        password: password.value,
        confirmPassword: confirmPassword.value
      };

      if (userPayload.password !== userPayload.confirmPassword) {
        throw Error('Passwords does not match')
      }

      const { user } = await createUserWithEmailAndPassword(auth, userPayload.email, userPayload.password);
      await sendEmailVerification(auth.currentUser as User);
      localStorage.setItem('userId', user.uid);
      console.log(user)
      await setDoc(doc(db, 'users', user.uid), {
        name: userPayload.name,
        email: userPayload.email,
        articles: [],
        createdAt: new Date().getTime()
      })
      await updateProfile(auth.currentUser!, {
        displayName: userPayload.name,
      })
      setShowSpinner(false);
      alert('Your account has been created successfully');
      router.push('/profile');
    } catch (error) {
      setShowSpinner(false);
      console.log(error)
    }
  }


  return (
    <>
      <Form ref={registrationForm} name="loginForm" onSubmit={e => createAccount(e, registrationForm.current as HTMLFormElement)}>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your full name</Form.Label>
          <Form.Control type="text" name="fullName" required placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" required placeholder="Enter email" />
          <Form.Text className="text-muted">
            Well never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type={inputType} name="password" required placeholder="Password" />
          <Form.Text className="text-muted" style={{ cursor: 'pointer' }} onClick={toggleShowPassword}>
            show password
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type={inputType} name="confirmPassword" required placeholder="Password" />
          <Form.Text className="text-muted" style={{ cursor: 'pointer' }} onClick={toggleShowPassword}>
            show password
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="terms">
          <Form.Check type="checkbox" required name="terms" label="I Accept" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          {showSpinner && (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>)}
          {!showSpinner && 'Create Account'}
        </Button>
      </Form>
    </>
  )
}

export default SignupForm;