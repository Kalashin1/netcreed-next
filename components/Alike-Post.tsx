import { NextComponentType } from 'next';
import { FC } from 'react';
import { Article } from '../types';
import { Card } from "react-bootstrap";
import Image from 'next/image';
import { useRouter } from 'next/router';
const marked = require('marked');

type Articles = {
  articles: Article[]
}

const AlikePost: FC<Articles> = ({ articles }) => {

  const router = useRouter();

  function navigate(route: string) {
    router.push(route)
  }
  return (
    <div className="container pt-4 pb-4">
      <h5 className="font-weight-bold spanborder"><span>Read next</span></h5>
      <div className="row">
        <div className="col-lg-6">
          <div className="card border-0 mb-4 box-shadow h-xl-300">
            <div style={{ backgroundImage: `url(${articles[0]?.coverPhoto})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', cursor: 'pointer' }} onClick={(e: any) => navigate(`/posts/${articles[0]?.id}`)
            }>
            </div>
            <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
              <h2 className="h4 font-weight-bold">
                <p className="text-dark card-title"
                  onClick={(e: any) => navigate(`/posts/${articles[0]?.id}`)
                  }>{articles[0]?.title}</p>
              </h2>
              <p className="card-text">
                {articles[0]?.description}
              </p>
              <div>
                <small className="d-block"><a className="text-muted" style={{ cursor: 'pointer' }} onClick={(e: any) => navigate(`/profile/${articles[0]?.author.id}`)}>{articles[0]?.author.name}</a></small>
                <small className="text-muted">{new Date(articles[0]?.createdAt).toDateString()} · {articles[0]?.readingTimeInMins} min read</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="flex-md-row mb-4 box-shadow h-xl-300">
            {articles && articles.map((article, index) => (
              <Card className="p-4 my-4" key={index}>
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" onClick={(e: any) => { e.preventDefault(); navigate(`/post/${article.id}`) }}>{article.title}</a>
                </h2>
                <p onClick={(e: any) => navigate(`/post/${article.id}`)} dangerouslySetInnerHTML={{ __html: marked.marked(article.description) }}>

                </p>
                <div className="card-text text-muted small"
                  onClick={(e: any) => navigate(`/profile/${article.author.id}`)}
                >
                  {article.author.name}
                </div>
                <small className="text-muted">{new Date(article.createdAt).toDateString()} · {article.readingTimeInMins} min read</small>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlikePost