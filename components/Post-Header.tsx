import { FC } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router'
const marked = require('marked');
import { Container, Row, Col } from 'react-bootstrap';

type _Article = {
  article: Article
}

const PostHeader: FC<_Article> = ({ article }) => {

  const router = useRouter();

  function navigate(route: string) {
    router.push(route);
  }

  function isAuthor() {
    if (typeof window !== 'undefined') {
      return article.author.id === localStorage.getItem('userId')
    }
  }

  return (
    <Container>
      <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
        <div className="h-100 tofront">
          <Row className="justify-content-between">
            <Col md={12} className="mb-4 pr-0">
              { /* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverPhoto} className="img-fluid" alt={article.title} />
            </Col>
            <Col md={12} className="pt pb-6 pr-6 align-self-center">
              {isAuthor() && (<p className="text-uppercase font-weight-bold">
                <a className="text-danger" href="./category.html"
                  onClick={e => {
                    e.preventDefault(); 
                    navigate(`/edit-post/${article.id}`)
                  }
                  }
                >Edit</a>
              </p>)}
              <h1 className="display-4 secondfont mb-3 font-weight-bold">{article.title}</h1>
              <p className="mb-3" dangerouslySetInnerHTML={{ __html: marked.marked(article.description) }}>
        
              </p>
              <div className="d-flex align-items-center">
                { /* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  className="rounded-circle"
                  height="60"
                  onClick={e => navigate(`/profile/${article.author.id}`)}
                  width="50"
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
                  alt={article.author.name}
                  src={article.author.coverPhoto}
                />
                <small className="ml-2" style={{ cursor: 'pointer' }} onClick={e => navigate(`/profile/${article.author.id}`)}>{article.author.name} <span className="text-muted d-block">{new Date(article.createdAt).toDateString()} &middot; {Math.floor(article.readingTimeInMins)} min. read</span>
                </small>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    </Container>
  )
}

export default PostHeader;