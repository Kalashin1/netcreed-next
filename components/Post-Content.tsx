import { FC, useState, useContext, useEffect } from 'react';
import { Article } from '../types';
import Script from 'next/script';
import SeenOutline from './svg/seen-outline';
import SeenFilled from './svg/seen-filled';
import FavoriteFilled from './svg/favorite-filled';
import FavoriteOutlined from './svg/favorite-outline';
import SaveOutlined from './svg/save-outline';
import SaveFilled from './svg/save-filled';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../pages/_app';

import 'highlight.js/styles/github-dark.css';
const marked = require('marked');
import hljs from 'highlight.js';
import { hasUserEngaged, toogleEngagement } from '../helper';

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

type _Article = {
  article: Article;
};

const PostContent: FC<_Article> = ({ article }) => {
  let theme: string = useContext(ThemeContext).theme;

  const [likes, toggleLike] = useState(article.likes.length);
  const [saves, toggleSave] = useState(article.saves.length);
  const [views, toggleView] = useState(article.views.length);
  const [hasLiked, toggleHasLiked] = useState(false);
  const [hasSaved, toggleHasSaved] = useState(false);
  const [hasViewed, toggleHasViewed] = useState(false);

  useEffect(() => {
    const setUp = async () => {
      let userId: string;
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId')!;
        toggleHasLiked(await hasUserEngaged(userId!, article.id, 'likes'));
        toggleHasSaved(await hasUserEngaged(userId!, article.id, 'saves'));
        toogleEngagement(
          localStorage.getItem('userId')!,
          article.id,
          'views',
          toggleHasViewed,
          toggleView
        );
      }
    };

    setUp();
  }, [article.id]);

  return (
    <Container className="pt-4 pb-4">
      <Row className="justify-content-center">
        <Col lg={2} md={12} className="pr-4 mb-4">
          <div className="sticky-top text-center">
            <div className="text-muted">Share this</div>
            <div className="share d-inline-block">
              <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a className="a2a_dd" href="https://www.addtoany.com/share">
                  &nbsp;
                </a>
                <a className="a2a_button_facebook"></a>
                <a className="a2a_button_twitter"></a>
              </div>
              <Script
                async
                src="https://static.addtoany.com/menu/page.js"
              ></Script>
            </div>
          </div>
        </Col>
        <Col md={12} lg={8}>
          <article
            className={`article-post text-${
              theme === 'light' ? 'dark' : 'light'
            }`}
            dangerouslySetInnerHTML={{ __html: marked.marked(article.body) }}
          ></article>
          <div
            className={`fixed-bottom bg-${
              theme === 'dark' ? 'white' : 'dark'
            } mx-auto my-4 px-2`}
            style={{
              width: 'fit-content',
              display: 'flex',
              justifyContent: 'between',
              flexDirection: 'row',
              borderRadius: '.9rem',
            }}
          >
            {/* <span 
              onClick={e => toogleEngagement(localStorage.getItem('userId')!, article.id, "views", toggleHasViewed, toggleView)} 
              style={{ cursor: 'pointer', display: 'flex', margin: '0 1rem' }}
            >
              { hasViewed ?
                (<SeenFilled />) :
                (<SeenOutline />)
              }
              <p className="mx-2 lead" style={{ position: 'relative', top: '.4rem' }}>{views}</p>
            </span> */}
            <span
              onClick={(e) =>
                toogleEngagement(
                  localStorage.getItem('userId')!,
                  article.id,
                  'likes',
                  toggleHasLiked,
                  toggleLike
                )
              }
              style={{ cursor: 'pointer', display: 'flex', margin: '0 1rem' }}
            >
              {hasLiked ? <FavoriteFilled /> : <FavoriteOutlined />}
              <p
                className={`mx-2 lead text-${
                  theme === 'light' ? 'light' : 'dark'
                }`}
                style={{ position: 'relative', top: '.4rem' }}
              >
                {likes}
              </p>
            </span>
            <span
              onClick={(e) =>
                toogleEngagement(
                  localStorage.getItem('userId')!,
                  article.id,
                  'saves',
                  toggleHasSaved,
                  toggleSave
                )
              }
              style={{ cursor: 'pointer', display: 'flex', margin: '0 1rem' }}
            >
              {hasSaved ? <SaveFilled /> : <SaveOutlined />}
              <p
                className={`mx-2 lead text-${
                  theme === 'light' ? 'light' : 'dark'
                }`}
                style={{ position: 'relative', top: '.4rem' }}
              >
                {saves}
              </p>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostContent;
