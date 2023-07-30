import { FC } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';
const marked = require('marked');
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext, AuthContext } from '../pages/_app';

type Prop = {
  title: string;
  description: string;
  creator?: string
};
const LessonHeader: FC<Prop> = ({ title, description, creator }) => {
  let theme: string = useContext(ThemeContext).theme;
  let { user } = useContext(AuthContext)
  const router = useRouter();

  return (
    <Container>
      <div
        className={`mb-3 pl-0 pt-0 pb-0 bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'
          } position-relative`}
      >
        <div className="h-100 tofront">
          <Row className="justify-content-between">
            <Col md={12} className="mb-4 pr-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* <img src={`/assets/img/demo/blog6.jpg`} className="img-fluid" alt="Leson 1" /> */}
            </Col>
            <Col md={12} className="pt pr-6 align-self-center">
              <h1 className="display-4 secondfont mb-3 font-weight-bold">
                {title}
              </h1>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default LessonHeader;
