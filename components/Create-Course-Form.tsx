import { NextPage } from "next";
import { Container, Form, Button } from "react-bootstrap";
import { useContext, useState, MutableRefObject, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { ThemeContext } from "../pages/_app";
import { createCourseFormHandler } from '../helper';


const CreateCourseForm: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;

  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);
  
  const createCourseForm: MutableRefObject<null | HTMLFormElement> = useRef(null);

  

  return (
    <Container>
      <Form name="articleForm" ref={createCourseForm} onSubmit={e => createCourseFormHandler(
        e, createCourseForm.current!,
        setShowSpinner,
        router
      )}>
        <Form.Group>
          <Form.Label className={`text-${theme === "dark" ? "light" : "dark"}`} htmlFor="exampleFormControlInput1">Title</Form.Label>
          <Form.Control type="text" name="title" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group>
          <Form.Label className={`text-${theme === "dark" ? "light" : "dark"}`} htmlFor="exampleFormControlFile1">Select Cover Photo</Form.Label>
          <Form.Control type="file" name="coverPhoto" className="form-control" id="exampleFormControlFile1" />
        </Form.Group>
        <Form.Group>
          <label className={`text-${theme === "dark" ? "light" : "dark"}`} htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows={5}></textarea>
        </Form.Group>

        <div className="my-2 flex">
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            {showSpinner && (<Spinner animation="border" role="status">
            </Spinner>)}
            {!showSpinner && 'Create Article'}
          </Button>
        </div>
      </Form>
    </Container>
  )
};

export default CreateCourseForm;