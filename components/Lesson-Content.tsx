import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


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
})


const LessonContent: FC = () => {
  return (
    <Container className="pt-4 pb-4">
      <Row className="justify-content-center">
        <Col md={12} lg={8}>
          <article className="article-post">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit habitasse leo curae, aptent dapibus nisi netus mollis aliquam tempus mi hac, torquent mauris cubilia ante bibendum metus mattis himenaeos maecenas. Torquent dictum quisque dignissim non tellus imperdiet vel diam inceptos magnis porta, fusce cum et a egestas maecenas cras nisl suscipit sollicitudin placerat congue, etiam nibh sem justo pretium risus aliquet luctus primis nam. Eu cum scelerisque nulla mattis mauris morbi faucibus tincidunt, et odio non habitant inceptos integer auctor sociosqu nunc, nec mi sagittis primis dictum ut ridiculus. Molestie consequat lectus gravida donec sed class dictum vestibulum elementum malesuada, mauris dictumst velit cursus commodo est vehicula volutpat nullam ultrices nam, laoreet cubilia litora luctus porta potenti aptent integer id. Consequat aenean lacinia netus vehicula est accumsan fames luctus porttitor, penatibus bibendum id dictumst blandit tristique proin faucibus ante, eu sapien iaculis porta sociis a ridiculus risus. Posuere ut dapibus laoreet nascetur accumsan leo mus sem, rutrum venenatis porta metus bibendum fermentum phasellus egestas, rhoncus mattis quam conubia primis ad felis. Phasellus tempor facilisi dictum malesuada cum praesent placerat, tempus luctus non vivamus est aptent, id suspendisse primis dui dapibus metus. Himenaeos et diam placerat nulla condimentum accumsan, pharetra consequat molestie mattis in mauris praesent, etiam bibendum sodales duis porttitor.
            </p>
          </article>
        </Col>
      </Row>
    </Container>
  )
}

export default LessonContent;