import { FC } from 'react';
import { Container, Form, Image, Row, Col, Button } from 'react-bootstrap';
import { useContext, useState, FormEvent } from 'react';
import { ThemeContext } from '../pages/_app';
import { createComment, getProfile } from '../helper';
import { useRouter } from 'next/router';

type Props = {
  articleId: string;
  userId: string;
  coverPhoto: string;
  parentCommentId?: string;
};
const AddComment: FC<Props> = ({
  articleId,
  userId,
  coverPhoto,
  parentCommentId,
}) => {
  const router = useRouter();
  const theme = useContext(ThemeContext).theme;
  const [body, setBody] = useState('');

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userProfile = await getProfile(userId);
    if (!userProfile) {
      router.push('/login');
    }
    const [res, err] = await createComment({
      articleId,
      body,
      owner: userProfile,
      parentCommentId: parentCommentId && parentCommentId,
    });

    if (!res) {
      console.log(err);
    } else {
      alert('Comment added');
      router.reload();
    }
  };
  return (
    <Container>
      <Row>
        <Col lg={1}>
          {coverPhoto && (
            <Image
              style={{ objectFit: 'contain' }}
              width={40}
              height={30}
              fluid
              roundedCircle
              src={coverPhoto}
              alt="Title"
            />
          )}
        </Col>
        <Col xs={12} lg={11}>
          <Form onSubmit={addComment}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Reply</Form.Label>
              <Form.Control
                required
                defaultValue={body}
                onChange={(e) => setBody(e.target.value)}
                className={`bg-${theme === 'dark' ? 'black' : 'white'} text-${
                  theme === 'dark' ? 'light' : 'dark'
                }`}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Add Comment</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddComment;
