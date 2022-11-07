import Layout from './Layout';
import { useContext } from 'react';
import { NextPage } from 'next';
import LoginForm from '../components/Login-Form';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from './_app';

const LoginPage: NextPage = ()=>{
  let theme: string = useContext(ThemeContext).theme;
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3 className={`text-${theme === "dark" ? 'light': 'dark'}`}>Login To your account</h3>
      </div>
      <Container className='my-4'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Container>
              <LoginForm />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
};

export default LoginPage;