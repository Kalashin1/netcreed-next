import Layout from './Layout';
import { NextPage } from 'next';
import ForgotPasswordForm from '../components/Forgot-Password';
import { Container, Row, Col } from 'react-bootstrap';

const ForgotPassword: NextPage = ()=>{
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3>Enter your email</h3>
      </div>
      <Container className='container my-4'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Container>
              <ForgotPasswordForm />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
};

export default ForgotPassword;