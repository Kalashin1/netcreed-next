import { FC, useRef, useState, MutableRefObject, FormEvent } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { auth } from '../Firebase-settings';
import { updatePassword } from 'firebase/auth';
import { useRouter } from 'next/router';

const ResetPassword: FC = () => {
  const router = useRouter();

  const [inputType, setInputType] = useState('password');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  const ResetPasswordForm: MutableRefObject<null | HTMLFormElement> =
    useRef(null);

  const resetPassword = async (
    e: FormEvent<HTMLFormElement>,
    form: HTMLFormElement
  ) => {
    setShowSpinner(true);
    try {
      const { password, password_2 } = form;
      const payload = {
        password: password.value,
        password_2: password_2.value
      };

      if (payload.password !== password_2.value) {
        throw Error('Password does not match');
      }
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, payload.password);
        alert('Password Reset Successful');
        setShowSpinner(false);
        router.push('/login');
      }
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }
  };

  return (
    <>
      <Form
        ref={ResetPasswordForm}
        name="resetPassword"
        onSubmit={(e) => resetPassword(e, ResetPasswordForm.current!)}
      >
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="password"
            type={inputType}
            name="password"
            required
            placeholder="Password"
          />
          <Form.Text
            className="text-muted"
            style={{ cursor: 'pointer' }}
            onClick={toggleShowPassword}
          >
            show password
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password_2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type={inputType}
            id="password_2"
            name="password_2"
            required
            placeholder="Password"
          />
          <Form.Text
            className="text-muted"
            style={{ cursor: 'pointer' }}
            onClick={toggleShowPassword}
          >
            show password
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          {showSpinner && <Spinner animation="border" role="status"></Spinner>}
          {!showSpinner && 'Send Email'}
        </Button>
      </Form>
    </>
  );
};
