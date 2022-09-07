import { NextComponentType } from 'next';
import { FC } from 'react';
import { Article } from '../types';
import Image from 'next/image';

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
                <a className="text-dark" href={`/posts/${articles[0]?.id}`}>{articles[0]?.title}</a>
              </h2>
              <p className="card-text">
                {articles[0]?.description}
              </p>
              <div>
                <small className="d-block"><a className="text-muted" href={`/posts/${articles[0]?.id}`}>{articles[0]?.author.name}</a></small>
                <small className="text-muted">{new Date(articles[0]?.createdAt).toDateString()} · {articles[0]?.readingTimeInMins} min read</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="flex-md-row mb-4 box-shadow h-xl-300">
            {articles && articles.map((article, index) => (
              <div className="mb-3 d-flex align-items-center" key={index}>
                <Image layout="fill" alt="some" src={`${article.coverPhoto}`} />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href={`/posts/${article.id}`}>{article.title}</a>
                  </h2>
                  <div className="card-text text-muted small">
                    {article.author.name}
                  </div>
                  <small className="text-muted">{ new Date(article.createdAt).toDateString()} · { article.readingTimeInMins} read</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlikePost