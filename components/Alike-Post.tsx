import { NextComponentType } from 'next';
import { FC } from 'react';
import { Article } from '../types';

type Articles = {
  articles: Article[]
}

const AlikePost: FC<Articles> = ({ articles }) => {
  return (
    <div className="container pt-4 pb-4">
      <h5 className="font-weight-bold spanborder"><span>Read next</span></h5>
      <div className="row">
        <div className="col-lg-6">
          <div className="card border-0 mb-4 box-shadow h-xl-300">
            <div style={{ backgroundImage: `url(${articles[0]?.coverPhoto})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            </div>
            <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
              <h2 className="h4 font-weight-bold">
                <a className="text-dark" href="#">{articles[0]?.title}</a>
              </h2>
              <p className="card-text">
                {articles[0]?.description}
              </p>
              <div>
                <small className="d-block"><a className="text-muted" href="./author.html">{articles[0]?.author.name}</a></small>
                <small className="text-muted">{new Date(articles[0]?.createdAt).toDateString()} · {articles[0]?.readingTimeInMins} min read</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="flex-md-row mb-4 box-shadow h-xl-300">
            {articles && articles.map((article, index) => (
              <div className="mb-3 d-flex align-items-center" key={index}>
                <img height="80" alt='some' src={`${article.coverPhoto}`} />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">{article.title}</a>
                  </h2>
                  <div className="card-text text-muted small">
                    {article.author.name}
                  </div>
                  <small className="text-muted">{ new Date(article.createdAt).toDateString()} · { article.readingTimeInMins} read</small>
                </div>
              </div>
            ))}
{/* 
            <div className="mb-3 d-flex align-items-center">
              <img height="80" src="./assets/img/demo/blog5.jpg" />
              <div className="pl-3">
                <h2 className="mb-2 h6 font-weight-bold">
                  <a className="text-dark" href="./article.html">Underwater museum brings hope to Lake Titicaca</a>
                </h2>
                <div className="card-text text-muted small">
                  Jake Bittle in LOVE/HATE
                </div>
                <small className="text-muted">Dec 12 · 5 min read</small>
              </div>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <img height="80" src="./assets/img/demo/blog6.jpg" />
              <div className="pl-3">
                <h2 className="mb-2 h6 font-weight-bold">
                  <a className="text-dark" href="./article.html">Sun-skimming probe starts calling home</a>
                </h2>
                <div className="card-text text-muted small">
                  Jake Bittle in LOVE/HATE
                </div>
                <small className="text-muted">Dec 12 · 5 min read</small>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlikePost