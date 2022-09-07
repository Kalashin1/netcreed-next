import { NextComponentType } from "next"
import Link from "next/link";
import { FC } from 'react'
import { Article } from "../types";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
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
        <>
          <h5 className="font-weight-bold spanborder"><span>All Stories</span></h5>
          {
            allPosts.map((post, index) => (
              <Col key={index} xs lg="6" className="my-4">
                <Container>
                  <Card.Img src={post.coverPhoto} alt="Card image" onClick={(e:any) => navigate(`/post/${post.id}`)} />
                  <Card className="bg-light text-dark">
                    <Card.Body>
                      <Card.Title onClick={(e:any) => navigate(`/post/${post.id}`)}>{post.title}</Card.Title>
                      <Card.Text onClick={(e:any) => navigate(`/post/${post.id}`)}>
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
            ))
          }
        </>
      </div>
      {/* <div className="col-md-6 pl-4">
          <h5 className="font-weight-bold spanborder"><span>Popular</span></h5>
          <ol className="list-featured">
            {featuredPosts.map((post, index) => (
              <li key={index}>
                <span>
                  <h6 className="font-weight-bold">
                    <Link href={`/post/${post.id}`} className="text-dark">{post.title}</Link>
                  </h6>
                  <p className="text-muted">
                    {post.username}
                  </p>
                </span>
              </li>
            ))}
          </ol>
        </div> */}
    </div>
  )
};

export default OtherPosts;