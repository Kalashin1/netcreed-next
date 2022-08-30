import { FC } from 'react';
import { Article } from '../types';

type _Article = {
  article: Article
}

const PostHeader: FC<_Article> = ({ article }) => {
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
        <div className="h-100 tofront">
          <div className="row justify-content-between">
            <div className="col-md-6 pt-6 pb-6 pr-6 align-self-center">
              <p className="text-uppercase font-weight-bold">
                <a className="text-danger" href="./category.html">Stories</a>
              </p>
              <h1 className="display-4 secondfont mb-3 font-weight-bold">{article.title}</h1>
              <p className="mb-3">
                { article.description}...
              </p>
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="/assets/img/demo/avatar2.jpg" width="70" />
                <small className="ml-2">{article.author.username} <span className="text-muted d-block">{ new Date(article.createdAt).toDateString()} &middot; { Math.floor(article.readingTimeInMins)} min. read</span>
                </small>
              </div>
            </div>
            <div className="col-md-6 pr-0">
              <img src={article.coverPhoto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeader;