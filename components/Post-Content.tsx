import { FC } from 'react';
import { Article } from '../types';

import 'highlight.js/styles/github-dark.css';
const marked = require('marked');
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: 'hljs language-',
  highlight: function(code, lang) {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  // return hljs.highlightAuto(code).value;
  return hljs.highlight(code, { language }).value;
  },
})

type _Article = {
  article: Article
}

const PostContent: FC<_Article> = ({ article }) => {
  return (
    <div className="container pt-4 pb-4">
      <div className="row justify-content-center">
        <div className="col-lg-2 pr-4 mb-4 col-md-12">
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
              <script async src="https://static.addtoany.com/menu/page.js"></script>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-8">
          <article className="article-post" dangerouslySetInnerHTML={{ __html: marked.marked(article.body) }}>
           
          </article>
          <div className="border p-5 bg-lightblue">
            <div className="row justify-content-between">
              <div className="col-md-5 mb-2 mb-md-0">
                <h5 className="font-weight-bold secondfont">Become a member</h5>
                Get the latest news right in your inbox. We never spam!
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Enter your e-mail address" />
                  </div>
                  <div className="col-md-12 mt-2">
                    <button type="submit" className="btn btn-success btn-block">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostContent;