import { NextPage } from "next";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseComponent from "../components/Course-Component";
import { useContext, useState } from 'react';
import { ThemeContext } from './_app';
import { db } from '../Firebase-settings';
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  where 
} from 'firebase/firestore';


export async function getServerSideProps() {
  const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
  const docRes = await getDocs(q);
  const courses = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  return {
    props: {
      courses
    }, // will be passed to the page component as props
  }
}

//@ts-ignore
const Courses: NextPage = ({ courses }) => {
  let theme: string = useContext(ThemeContext).theme;
  const arr = [1, 2, 3, 4];
  return (
    <Layout>
      <Container className="my-4">
        <h3 className={`display-4 text-${theme === "dark"? "light": "dark"}`}>Courses</h3>
        <Row className="justify-content-center">
          { arr.map((ar, i) => (
            <Col md={6} key={i}>
              <div className="my-4">
                <CourseComponent />
              </div>      
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Courses;