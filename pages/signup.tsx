import SignupForm from "../components/Signup-Form"
import { NextPage } from "next";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";

const Signup: NextPage = () => {
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3 className='my-4'>Create a new account</h3>
      </div>
      <Container className='my-4'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Container>
              <SignupForm creator={false} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signup;