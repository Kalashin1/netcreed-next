import { FC } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router'
const marked = require('marked');
import { Container, Row, Col } from 'react-bootstrap';



const LessonHeader: FC = () => {

  const router = useRouter();

  return (
    <Container>
      <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
        <div className="h-100 tofront">
          <Row className="justify-content-between">
            <Col md={12} className="mb-4 pr-0">
              { /* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/img/demo/blog6.jpg`} className="img-fluid" alt="Leson 1" />
            </Col>
            <Col md={12} className="pt pb-6 pr-6 align-self-center">
              {(<p className="text-uppercase font-weight-bold">
                <a className="text-danger" href="./category.html">Edit</a>
              </p>)}
              <h1 className="display-4 secondfont mb-3 font-weight-bold">Lesson 1</h1>
              <p className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, tristique sem placerat urna et ut morbi, suscipit accumsan justo parturient volutpat massa
              </p>
            </Col>

          </Row>
        </div>
      </div>
    </Container>
  )
}

export default LessonHeader;