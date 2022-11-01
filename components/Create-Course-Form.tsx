import { NextPage } from "next";
import { Container, Form, Button } from "react-bootstrap";

const CreateCourseForm: NextPage = () => {
  return (
    <Container>
      <div>
        <Form name="articleForm">
          <Form.Group>
            <Form.Label htmlFor="exampleFormControlInput1">Title</Form.Label>
            <Form.Control type="text" name="articleName" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="exampleFormControlFile1">Select Cover Photo</Form.Label>
            <Form.Control type="file" name="coverPhoto" className="form-control" id="exampleFormControlFile1" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <Form.Select>
              <option value="hello">Hello</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group>
            <label htmlFor="exampleFormControlTextarea1">Post Content</label>
            <textarea className="form-control" name="body" id="exampleFormControlTextarea1" rows={15}></textarea>
          </Form.Group>

          <div className="my-2 flex">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              Save Information
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
};

export default CreateCourseForm;