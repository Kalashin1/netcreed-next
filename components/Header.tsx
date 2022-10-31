import { NextComponentType } from "next"
import { FC } from 'react';
import { Article } from "../types";
import Link from 'next/link';
import { Container, Row, Col, Card } from "react-bootstrap";
const marked = require('marked');

type _Article = {
  article: Article
} 

const Header: FC<_Article> = ({ article }) => {
  return (
    <Container className="container">
      <div className="jumbotron jumbotron-fluid mb-3 pt-0 pb-0 bg-lightblue position-relative">
        <div className="pl-4 pr-0 h-100 tofront">
          <Row className="justify-content-between">
            <Col md={6} className="pt-6 pb-6 align-self-center">
              <h1 className="secondfont mb-3 font-weight-bold">{article.title}</h1>
              <p className="mb-3" dangerouslySetInnerHTML={{ __html: marked.marked(article.description) }}>
        
              </p>
              <Link href={`/post/${article.id}`} className="btn btn-dark">Read More</Link>
            </Col>
            <Col md={6} className="col-md-6 d-none d-md-block pr-0" style={{ backgroundSize : 'cover', backgroundImage :`url(${article.coverPhoto})` }}>	</Col>
          </Row>
        </div>
      </div>
    </Container>
  )
};

export default Header;