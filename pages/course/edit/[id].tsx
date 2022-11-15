import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import EditCourseForm from "../../../components/Edit-Course-Form";
import Layout from "../../Layout";
import { useContext } from 'react';
import { ThemeContext } from '../../_app';
import React from "react";
import { useRouter } from "next/router";

const EditCourse: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  const router = useRouter()
  const id = router.query.id as string
  return (
    <Layout>
      <div>
        <div className='text-center my-4'>
          <h3 className={`my-4 text-${theme === "dark"? "light": "dark"}`}>Edit Course</h3>
        </div>
        <Container className='my-4'>
          <Row className='justify-content-center'>
            <Col md={12}>
              <Container>
                { id && (<EditCourseForm courseId={id} />) }
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default EditCourse;