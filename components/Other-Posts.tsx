import { NextComponentType } from "next"
import Link from "next/link";
import { FC } from 'react'
import { Article } from "../types";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
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
    <div className="container">
      <div className="row justify-content-center">

        <Col xs lg="6">
          <h5 className="font-weight-bold spanborder"><span>All Stories</span></h5>
          {allPosts.map((post, index) => (
            <Container key={index} className="my-4">
              <Card.Img src={post.coverPhoto} alt="Card image" onClick={(e: any) => navigate(`/post/${post.id}`)} />
              <Card className="bg-light text-dark">
                <Card.Body>
                  <Card.Title onClick={(e: any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                  {/* <Card.Text onClick={(e: any) => navigate(`/post/${post.id}`)}>
                    {post.description}
                  </Card.Text> */}
                  <Card.Text className="card-text text-muted small"
                    onClick={(e: any) => navigate(`/profile/${post.author.id}`)}
                  >
                    By {post.author.name}
                  </Card.Text>
                  <Card.Text>{new Date(post.createdAt).toDateString()}  &middot; {post.readingTimeInMins} mins</Card.Text>
                </Card.Body>

              </Card>
            </Container>
          ))}
        </Col>
        <div className="col-md-6 pl-4">
          <h5 className="font-weight-bold spanborder"><span>Popular</span></h5>
          <ol className="list-featured">
            {featuredPosts && featuredPosts.map((article, index) => (
              <Card className="p-4 my-4" key={index}>
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" onClick={(e: any) => { e.preventDefault(); navigate(`/post/${article.id}`) }}>{article.title}</a>
                </h2>
                <p onClick={(e: any) => navigate(`/post/${article.id}`)} dangerouslySetInnerHTML={{ __html: marked.marked(article.description)}}>
                      
                    </p>
                <div className="card-text text-muted small"
                  onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                >
                  {article.author.name}
                </div>
                <small className="text-muted">{new Date(article.createdAt).toDateString()} · {article.readingTimeInMins} min read</small>
              </Card>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
};

export default OtherPosts;