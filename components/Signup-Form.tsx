import { useState, useRef, MutableRefObject, FC,  useContext } from "react";
import { useRouter } from 'next/router'
import { Form, Button, Spinner } from "react-bootstrap";
import { ThemeContext } from "../pages/_app";
import { createAccount } from "../helper"


type isCreator = {
  creator: boolean
}
const SignupForm: FC<isCreator> = ({ creator }) => {

  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();


  const registrationForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  const [inputType, setInputType] = useState('password');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSpinner2, setShowSpinner2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
    if (showPassword) {
      setInputType('text')
    } else {
      setInputType('password');
    }
  }

  return (
    <>
      <Form ref={registrationForm} name="loginForm" onSubmit={e => createAccount(
        e, 
        registrationForm.current as HTMLFormElement,
        setShowSpinner,
        creator,
        router
      )}>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`}>Your full name</Form.Label>
          <Form.Control type="text" name="fullName" required placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`}>Email address</Form.Label>
          <Form.Control type="email" name="email" required placeholder="Enter email" />
          <Form.Text className="text-muted">
            Well never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`}>Password</Form.Label>
          <Form.Control type={inputType} name="password" required placeholder="Password" />
          <Form.Text className="text-muted" style={{ cursor: 'pointer' }} onClick={toggleShowPassword}>
            show password
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label className={`text-${theme === "dark" ? "light": "dark"}`}>Confirm Password</Form.Label>
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
      {/* <h5 className="text-center mt-4">Or</h5> */}
      {/* <Button variant="primary" onClick={signinWithGoogle} style={{ width: '100%', marginTop: '.5rem' }}>
        {showSpinner2 && (<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)}
        {!showSpinner2 && (<svg xmlns="http://www.w3.org/2000/svg" fill="white" width={25} viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>)}
      </Button> */}
    </>
  )
}

export default SignupForm;