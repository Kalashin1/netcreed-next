import { FC } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router'

type _Article = {
  article: Article
}

const PostHeader: FC<_Article> = ({ article }) => {

  const router = useRouter();

  function navigate(route: string) {
    router.push(route);
  }

  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
        <div className="h-100 tofront">
          <div className="row justify-content-between">
            <div className="col-md-12 mb-4 pr-0">
              { /* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverPhoto} className="img-fluid" alt={article.title} />
            </div>
            <div className="col-md-6 pt pb-6 pr-6 align-self-center">
              {/* <p className="text-uppercase font-weight-bold">
                <a className="text-danger" href="./category.html">Stories</a>
              </p> */}
              <h1 className="display-4 secondfont mb-3 font-weight-bold">{article.title}</h1>
              <p className="mb-3">
                {article.description}...
              </p>
              <div className="d-flex align-items-center">
                { /* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  className="rounded-circle"
                  height="60"
                  onClick={e => navigate(`/profile/${article.author.id}`)}
                  width="50"
                  style={{ objectFit: 'cover' }}
                  alt={article.author.name}
                  src={article.author.coverPhoto}
                />
                <small className="ml-2" onClick={e => navigate(`/profile/${article.author.id}`)}>{article.author.username} <span className="text-muted d-block">{new Date(article.createdAt).toDateString()} &middot; {Math.floor(article.readingTimeInMins)} min. read</span>
                </small>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeader;