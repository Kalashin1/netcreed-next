import SignupForm from '../components/Signup-Form';
import { NextPage } from 'next';
import Layout from './Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from './_app';

const Register: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    //@ts-ignore
    <Layout>
      <div className="text-center my-4">
        <h3 className={`my-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          Create a new account
        </h3>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Container>
              <SignupForm creator={true} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
