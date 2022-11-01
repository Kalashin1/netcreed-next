import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import CreateCourseForm from "../components/Create-Course-Form";
import Layout from "./Layout";

const CreateCourse: NextPage = () => {
  return (
    <Layout>
      <div>
        <div className='text-center my-4'>
          <h3 className='my-4'>Create a new account</h3>
        </div>
        <Container className='my-4'>
          <Row className='justify-content-center'>
            <Col md={12}>
              <Container>
                <CreateCourseForm />
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default CreateCourse;