import { FC } from "react";
import Link from "next/link";
import { Col, Container, Card, Row } from "react-bootstrap";
import Image from "next/image";
import { Article } from "../types";
import { useRouter } from 'next/router'

type Posts = {
  posts: Article[]
}

const RecentPosts: FC<Posts> = ({ posts }) => {
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route)
  }
  return (
    <div className="container pt-4 pb-4">
      <Row>
        <h5 className="font-weight-bold spanborder"><span>All Stories</span></h5>
        {posts && posts.map((post, index) => (
          <Col lg={6}  key={index} className="my-2">
            <Container>
              <Card bg="dark" text="light">
                <Card.Img style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }} className="img-fluid" src={post.coverPhoto} alt="Card image" onClick={(e: any) => navigate(`/post/${post.id}`)} />
                <Card.Body>
                  <Card.Title style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                  {/* <Card.Text style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text> */}
                  <Card.Text style={{ cursor: 'pointer' }} className="card-text text-muted small" onClick={(e: any) => navigate(`/profile/${post.author.id}`)}>
                    By {post.author.name}
                  </Card.Text>
                  <Card.Text>{new Date(post.createdAt).toDateString()}  &middot; {Math.floor(post.readingTimeInMins)} mins</Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        ))}

      </Row>
    </div>
  )
}

export default RecentPosts;