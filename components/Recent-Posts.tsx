import { NextComponentType } from "next"
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
        {posts && posts.map((post, index) => (
          <Col lg={6} sm key={index} className="my-2">
            <Container>
              <Card.Img style={{ cursor: 'pointer'}} src={post.coverPhoto} alt="Card image" onClick={(e:any) => navigate(`/post/${post.id}`)} />
              <Card className="bg-white text-dark">
                <Card.Body>
                  <Card.Title style={{ cursor: 'pointer'}} onClick={(e:any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                  <Card.Text style={{ cursor: 'pointer'}} onClick={(e:any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text>
                  <Card.Text className="card-text text-muted small">
                    By {post.author.name}
                  </Card.Text>
                  <Card.Text>{new Date(post.createdAt).toDateString()}  &middot; {post.readingTimeInMins} mins</Card.Text>
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