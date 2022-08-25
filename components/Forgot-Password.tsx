import { FC, useRef, useState, MutableRefObject, FormEvent  } from "react";
import { Form, Button, Spinner } from 'react-bootstrap';
import { auth } from '../Firebase-settings';
import { sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from "next/router";

const ForgotPasswordForm: FC = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setShowError] = useState(false);

  const requestPasswordResetLink = async (e: FormEvent<HTMLFormElement>,email: string) => {
    e.preventDefault()
    setShowSpinner(true)
    try {
      await sendPasswordResetEmail(auth, email);
      localStorage.setItem('userEmail', email);
      alert('Password reset email has been');
      setShowSpinner(true);
      router.push('/login');
    } catch (error) {
      setShowSpinner(true);
      console.log(error);
    }
  }
  
  return (
    <Form name="forgotPasswordForm"
    onSubmit={e => requestPasswordResetLink(e, email)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} 
            onChange={e => setEmail(e.target.value)}
            name="email" required placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            Well never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          {showSpinner && (<Spinner animation="border" role="status">
          </Spinner>)}
          {!showSpinner && 'Send Email'}
        </Button>
      </Form>
  )
}

export default ForgotPasswordForm;