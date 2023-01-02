import { FC, useEffect, useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import CommentForm from './Comment-Form';
import {
  Container,
  Card,
  Row,
  Col,
  Dropdown,
  Button,
  Form,
} from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { Comment, UserProfile } from '../types';
import {
  getArticle,
  updateComment,
  deleteComment,
  engageComment,
  hasUserLikeComment
} from '../helper';
import { CommentIcon, LikeCommentIconFilled, LikeCommentIconOutline, EditIcon, DeleteIcon } from './svg/icons';
const marked = require('marked');


type Props = {
  commentId: string;
  body: string;
  owner: UserProfile;
  articleId: string;
  createdAt: number;
  likes: number;
  parentCommentId?: string;
};

const Comment: FC<Props> = ({
  body,
  owner,
  articleId,
  parentCommentId,
  commentId,
  createdAt,
  likes,
}) => {
  const theme = useContext(ThemeContext).theme;
  const [showCommentForm, updateShowCommentForm] = useState(false);
  const [showEditButton, updateEditButton] = useState(false);
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const [commentBody, setCommentBody] = useState(body);

  const [_likes, setLikes] = useState(likes);
  const [hasLiked, toggleHasLiked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getChildComments = async () => {
      const { article } = await getArticle(articleId);
      const comments = article.comments?.filter(
        (c) => c.parentComment === commentId
      );
      setChildComments(comments);
      const bool = await hasUserLikeComment(articleId, commentId);
      toggleHasLiked(bool)
    };

    getChildComments();
  }, [articleId, commentId]);

  const updateArticleFormHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string,
    body: string
  ) => {
    e.preventDefault();
    const [bool, err] = await updateComment(articleId, id, body);
    if (err && !bool) {
      console.log(bool);
      console.log(err);
    } else if (bool) {
      alert('Updated!');
      router.reload();
    }
  };

  const handleDeleteComment = async (id: string) => {
    const res = confirm('Are you sure you want to delete this comment');
    if (res) {
      const [bool, err] = await deleteComment(articleId, id);
      if (!bool && err) {
        console.log(bool);
        console.log(err);
      } else if (bool) {
        alert('Comment Deleted!');
        router.reload();
      }
    }
  };

  const toggleCommentLikes = async () => {
    const [type, engagementLength, message] = await engageComment(
      articleId,
      commentId
    );
    console.log(engagementLength);
    if (type === 1) {
      toggleHasLiked(!hasLiked);
      setLikes(engagementLength!);
    } else if (type === -1) {
      toggleHasLiked(!hasLiked);
      setLikes(engagementLength!);
    } else if (message && !type && !engagementLength) {
      console.log(message);
    }
  };

  let id = '';
  if (typeof window !== 'undefined') {
    id = localStorage.getItem('userId')!;
  }

  return (
    <Container>
      <Row className="pt-4">
        <Col lg={2} className="py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-circle "
            onClick={(e) => router.push('/user/' + owner.id)}
            style={{ objectFit: 'cover', cursor: 'pointer' }}
            width={60}
            height={60}
            src={owner?.coverPhoto}
            alt="Title"
          />
        </Col>
        <Col xs={12} lg={10}>
          <Card bg={theme}>
            <Card.Body
              className={`text-${theme === 'dark' ? 'light' : 'dark'}`}
            >
              <div className="mt-2 d-flex justify-content-between">
                <h5>
                  {owner?.username} -{' '}
                  <span style={{ opacity: 0.5, fontSize: '15px' }}>
                    {new Date(createdAt).toDateString()}
                  </span>
                </h5>
                
              </div>
              {!showEditButton ? (
                <p
                  dangerouslySetInnerHTML={{ __html: marked.marked(body) }}
                ></p>
              ) : (
                <Form
                  onSubmit={(e) =>
                    updateArticleFormHandler(e, commentId, commentBody)
                  }
                >
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Update Comment</Form.Label>
                    <Form.Control
                      required
                      defaultValue={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                      className={`bg-${
                        theme === 'dark' ? 'black' : 'white'
                      } text-${theme === 'dark' ? 'light' : 'dark'}`}
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                  {id && id === owner.id && (
                    <Button type="submit" className="mx-3">
                      Update
                    </Button>
                  )}
                </Form>
              )}
            </Card.Body>
            {showCommentForm ? (
              <div
                className="ml-4 mb-4 p-4"
                style={{ borderLeft: 'solid 2px white' }}
              >
                <CommentForm
                  articleId={articleId}
                  userId={owner?.id}
                  parentCommentId={commentId}
                />
              </div>
            ) : (
              ''
            )}
          </Card>
          <div className="ml-2 justify-items-between p-2 d-flex">
            <div
              className="d-flex align-items-center mr-4"
              style={{ cursor: 'pointer'}}
              onClick={toggleCommentLikes}
            >
              {hasLiked ? <LikeCommentIconFilled /> : <LikeCommentIconOutline />}
              <span
                className={`ml-2 text-${theme === 'dark' ? 'light' : 'dark'}`}
              >
                {_likes}
              </span>
            </div>
            <div
              className="d-flex align-items-center ml-2"
              style={{ cursor: 'pointer'}}
              onClick={(e) => updateShowCommentForm(!showCommentForm)}
            >
              <CommentIcon />
            </div>
            {id && id === owner.id &&(<div
              className="d-flex align-items-center ml-4"
              style={{ cursor: 'pointer'}}
              onClick={(e) => updateEditButton(!showEditButton)}
            >
              <EditIcon />
            </div>)}
            {id && id === owner.id && (<div
              className="d-flex align-items-center ml-4"
              style={{ cursor: 'pointer'}}
              onClick={(e) => handleDeleteComment(commentId)}
            >
              <DeleteIcon />
            </div>)}
          </div>
          <div className="ml-4 my-4 border-left">
            {childComments &&
              childComments.map((comment) => (
                <Comment
                  key={comment.id}
                  articleId={articleId}
                  body={comment.body}
                  owner={comment.owner}
                  commentId={comment.id}
                  parentCommentId={comment.parentComment}
                  createdAt={comment.createdAt}
                  likes={comment.likes.length ?? 0}
                />
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
