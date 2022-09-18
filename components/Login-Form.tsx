import { NextComponentType } from "next"
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { auth } from "../Firebase-settings";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { useRouter } from "next/router";
import { Form, Button, Spinner } from 'react-bootstrap'

const LoginForm: NextComponentType = () => {

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const loginForm: MutableRefObject<null | HTMLFormElement> = useRef(null)

  const [inputType, setInputType] = useState('password');
  
  const [showSpinner, setShowSpinner] = useState(false);
  
  const [showSpinner2, setShowSpinner2] = useState(false);
  const [passwordError, showPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setInputType('text')
    } else {
      setInputType('password');
    }
  }

  const login = async (e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
    try {
      e.preventDefault()
      setShowSpinner(true)
      const { email, password } = form;
      const loginPayload: Record<string, string> = {
        email: email.value,
        password: password.value
      }

      const { user } = await signInWithEmailAndPassword(auth, loginPayload.email, loginPayload.password);
      localStorage.setItem('userId', user.uid);
      setShowSpinner(false)
      alert('Login successfull')
      router.push('/profile')
    } catch (error:any) {
      setShowSpinner(false)
      if (error.message.includes('auth/wrong-password')){
        showPasswordError(true)
      }
      console.log(error)
    }
  }

  const signinWithGoogle = async (e: any) => {
    e.preventDefault();
    setShowSpinner2(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
      localStorage.setItem('userToken', token!)
      localStorage.setItem('userId', user.uid);
      console.log(credential, token, user)
      setShowSpinner2(false);
      alert('Login successfull')
      router.push('/profile')
    } catch (error) {
      setShowSpinner2(false);
      console.log(error);
    }

  }

  return (
    <>
      <Form ref={loginForm} name="loginForm" onSubmit={e => login(e, loginForm.current as HTMLFormElement)}>
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
          { passwordError && (<small className="text-danger">Incorrect Password</small>)}
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          {showSpinner && (<Spinner animation="border" role="status">
          </Spinner>)}
          {!showSpinner && 'Login'}
        </Button>
      </Form>
      {/* <Button variant="primary" onClick={signinWithGoogle} style={{ width: '100%', marginTop: '.5rem' }}>
        {showSpinner2 && (<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)}
        {!showSpinner2 && (<svg xmlns="http://www.w3.org/2000/svg" fill="white" width={25} viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>)}
      </Button> */}
    </>
  )
};

export default LoginForm