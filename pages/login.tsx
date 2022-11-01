import Layout from './Layout';
import { NextPage } from 'next';
import LoginForm from '../components/Login-Form';
import { Container, Row, Col } from 'react-bootstrap';

const LoginPage: NextPage = ()=>{
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3>Login To your account</h3>
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