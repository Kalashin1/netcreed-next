import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

import 'highlight.js/styles/github-dark.css';
const marked = require('marked');
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: 'hljs language-',
  //@ts-ignore
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    // return hljs.highlightAuto(code).value;
    return hljs.highlight(code, { language }).value;
  },
});

type Prop = {
  content: string
}
const LessonContent: FC<Prop> = ({ content }) => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    <Container className="pt-4 pb-4">
      <Row className="justify-content-center">
        <Col md={12} lg={8}>
          <article
            className={`article-post text-${
              theme === 'dark' ? 'light' : 'dark'
            }`}
          >
            <p dangerouslySetInnerHTML={{ __html: marked.marked(content) }}>
             
            </p>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default LessonContent;
