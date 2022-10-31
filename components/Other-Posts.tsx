import { NextComponentType } from "next"
import Link from "next/link";
import { FC } from 'react'
import { Article } from "../types";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Container, Row } from "react-bootstrap";
const marked = require('marked');

type Posts = {
  allPosts: Article[],
  featuredPosts: Article[],
}
import { useRouter } from "next/router";

const OtherPosts: FC<Posts> = ({ allPosts, featuredPosts }) => {
  // console.log(allPosts)
  const router = useRouter()

  const navigate = (route: string) => {
    router.push(route)
  }

  return (
    <Container>
      <Row className="justify-content-center">

        <Col xs lg="6">
          <h5 className="font-weight-bold spanborder"><span>Latest Stories</span></h5>
          {allPosts.map((post, index) => (
            <Container key={index} className="my-4">
              <Card.Img src={post.coverPhoto} style={{ cursor: 'pointer' }} alt="Card image" onClick={(e: any) => navigate(`/post/${post.id}`)} />
              <Card className="bg-light text-dark">
                <Card.Body>
                  <Card.Title style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                  {/* <Card.Text onClick={(e: any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text> */}
                  <Card.Text style={{ cursor: 'pointer' }} className="card-text text-muted small"
                    onClick={(e: any) => navigate(`/profile/${post.author.id}`)}
                  >
                    By {post.author.name}
                  </Card.Text>
                  <Card.Text>{new Date(post.createdAt).toDateString()}  &middot; {Math.floor(post.readingTimeInMins)} mins</Card.Text>
                </Card.Body>

              </Card>
            </Container>
          ))}
        </Col>
        <Col md={6} className="pl-4">
          <h5 className="font-weight-bold spanborder"><span>Other Stories</span></h5>
          <ol className="list-featured">
            {featuredPosts && featuredPosts.map((article, index) => (
              <Card className="p-4 my-4" key={index}>
                <Card.Title className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" style={{ cursor: 'pointer' }} onClick={(e: any) => { e.preventDefault(); navigate(`/post/${article.id}`) }}>{article.title}</a>
                </Card.Title>
                <p onClick={(e: any) => navigate(`/post/${article.id}`)} style={{ cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: marked.marked(article.description)}}>
                      
                    </p>
                <div className="card-text text-muted small"
                style={{ cursor: 'pointer' }}
                  onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                >
                  {article.author.name}
                </div>
                <small className="text-muted">{new Date(article.createdAt).toDateString()} · {Math.floor(article.readingTimeInMins)} min read</small>
              </Card>
            ))}
          </ol>
        </Col>
      </Row>
    </Container>
  )
};

export default OtherPosts;