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
        <Col lg={6} className="my-2">
          {posts && posts.map((post, index) => (
            <Container key={index}>
              <Card.Img style={{ cursor: 'pointer' }} src={post.coverPhoto} alt="Card image" onClick={(e: any) => navigate(`/post/${post.id}`)} />
              <Card className="bg-white text-dark">
                <Card.Body>
                  <Card.Title style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                  <Card.Text style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text>
                  <Card.Text className="card-text text-muted small" onClick={(e: any) => navigate(`/profile/${post.author.id}`)}>
                    By {post.author.name}
                  </Card.Text>
                  <Card.Text>{new Date(post.createdAt).toDateString()}  &middot; {post.readingTimeInMins} mins</Card.Text>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </Col>
        <Col lg={6} className="my-2">
          {posts && posts.map((article, index) => (
            <Container key={index}>
              <Card className="p-4">
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" onClick={(e: any) => { e.preventDefault(); navigate(`/post/${article.id}`) }}>{article.title}</a>
                </h2>
                <p onClick={(e: any) => navigate(`/post/${article.id}`)}>
                  {article.description}
                </p>
                <div className="card-text text-muted small"
                  onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                >
                  {article.author.name}
                </div>
                <small className="text-muted">{new Date(article.createdAt).toDateString()} · {article.readingTimeInMins} min read</small>
              </Card>
            </Container>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default RecentPosts;