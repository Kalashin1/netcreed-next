import { NextComponentType } from "next"
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { auth } from "../Firebase-settings";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { Form, Button, Spinner } from 'react-bootstrap'

const LoginForm: NextComponentType = () => {

  const router = useRouter();

  const loginForm: MutableRefObject<null | HTMLFormElement> = useRef(null)

  const [inputType, setInputType] = useState('password');
  
  const [showSpinner, setShowSpinner] = useState(false);
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
      setShowSpinner(true)
      alert('Login successfull')
      router.push('/profile')
    } catch (error) {
      setShowSpinner(true)
      console.log(error)
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          {showSpinner && (<Spinner animation="border" role="status">
          </Spinner>)}
          {!showSpinner && 'Login'}
        </Button>
      </Form>
    </>
  )
};

export default LoginForm