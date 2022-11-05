import { FC, useState, useContext } from 'react';
import { Article, Author, ARTICLE_ENGAGEMENT, User } from '../types';
import Script from 'next/script';
import SeenOutline from './svg/seen-outline';
import SeenFilled from './svg/seen-filled';
import FavoriteFilled from './svg/favorite-filled';
import FavoriteOutlined from './svg/favorite-outline';
import SaveOutlined from './svg/save-outline';
import SaveFilled from './svg/save-filled';
import { db } from '../Firebase-settings';
import { getDoc, updateDoc, doc } from '@firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from "../pages/_app";

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

type _Article = {
  article: Article
}

async function toogleEngagement(userId: string, articleId: string, type: ARTICLE_ENGAGEMENT) {
  // get a user Ref
  const userRef = await getDoc(doc(db, "users", userId));
  if (userRef.exists()) {
    const user = { ...userRef.data(), id: userRef.id } as User
    const articleRef = await getDoc(doc(db, "users", articleId))
    if (articleRef.data()) {
      const article = { ...articleRef.data(), id: articleRef.id } as Article
      const engagements = article[type]
      if (engagements.find(u => u.id === user.id)) {
        const updatedEngagements = engagements.filter(u => u.id !== user.id);
        if (type !== 'views') {
          await updateDoc(doc(db, "users", articleId), { updatedEngagements })
        }
      } else {
        const updatedEngagements = [...engagements, {
          username: user.username,
          phone: user.phone,
          name: user.name,
          twitter: user.twitter,
          github: user.github,
          coverPhoto: user.profilePhoto,
          email: user.email,
          id: user.id,
        }]
        await updateDoc(doc(db, "users", articleId), { updatedEngagements })
      }
    }
  }
  await updateDoc(doc(db, 'articles', articleId), {});
}

const PostContent: FC<_Article> = ({ article }) => {

  let theme: string = useContext(ThemeContext).theme;

  const [like, toggleLike] = useState([])
  const [save, toggleSave] = useState([])
  // const [viw]
  return (
    <Container className="pt-4 pb-4">
      <Row className="justify-content-center">
        <Col lg={2} md={12} className="pr-4 mb-4">
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
        <Col md={12} lg={8}>
          <article className={`article-post text-${theme === 'light'? 'dark': 'light'}`} dangerouslySetInnerHTML={{ __html: marked.marked(article.body) }}>

          </article>
          {/* <div className="fixed-bottom bg-light mx-auto my-4 px-2" style={{ width: 'fit-content', display: 'flex', justifyContent: 'between', flexDirection: 'row', borderRadius: '.9rem' }}>
            <a href={`https://linkedin.com/in/`} style={{ display: 'flex', margin: '0 1rem' }}>
              <SeenOutline />
              <p className="mx-2 lead" style={{ position: 'relative', top: '.4rem' }}>1</p>
            </a>
            <a href={`https://twitter.com/`} style={{ display: 'flex', margin: '0 1rem' }}>
              <FavoriteOutlined />
              <p className="mx-2 lead" style={{ position: 'relative', top: '.4rem' }}>1</p>
            </a>
            <a href={`https://twitter.com/`} style={{ display: 'flex', margin: '0 1rem' }}>
              <SaveOutlined />
              <p className="mx-2 lead" style={{ position: 'relative', top: '.4rem' }}>1</p>
            </a>
          </div> */}
        </Col>
      </Row>
    </Container>
  )
}

export default PostContent;