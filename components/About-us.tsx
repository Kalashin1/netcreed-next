import Script from 'next/script';
import { FC, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../pages/_app'

const About: FC = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Container className="pt-4 pb-4">
      <Row className="justify-content-center">
        <Col lg={2} md={12} className="pr-4 mb-4 text-center">
          <div className="sticky-top text-center">
            <div className="text-muted">
              Share this
            </div>
            <div className="share d-inline-block">
              <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a className="a2a_button_facebook"></a>
                <a className="a2a_button_twitter"></a>
              </div>
              <Script async src="https://static.addtoany.com/menu/page.js"></Script>
            </div>
          </div>
        </Col>
        <div className="col-md-12 col-lg-8">
          <article className={`article-post text-${theme === 'light'? 'dark': 'light'}`}>
            <p>
              Welcome to Netcreed, where you can get articles written by Tech professionals to help others in tech find solution to problems, grow and expand their knowledge and network. You will find top notch articles on different topics in IT and Tech space.
            </p>
            
          </article>
         
        </div>
      </Row>
    </Container>
  )
}

export default About;