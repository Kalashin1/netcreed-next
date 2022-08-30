import { NextComponentType } from "next"
import { FC } from "react";
import { Article } from "../types";

type Posts = {
  posts: Article[]
}

const RecentPosts: FC<Posts> = ({ posts }) => {
  return (
    <div className="container pt-4 pb-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="card border-0 mb-4 box-shadow h-xl-300">
            <div style={{ backgroundImage: `url(${posts[0]?.coverPhoto})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
              <h2 className="h4 font-weight-bold">
                <a className="text-dark" href="./article.html">{posts[0]?.title}</a>
              </h2>
              <p className="card-text">
                {posts[0]?.description}
              </p>
              <div>
                <small className="d-block"><a className="text-muted" href="./author.html">{posts[0]?.author?.username}</a></small>
                <small className="text-muted">{new Date(posts[0]?.createdAt).toDateString()} &middot; { Math.floor(posts[0]?.readingTimeInMins)} min read</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="flex-md-row mb-4 box-shadow h-xl-300">
            {posts && posts.map((post, index) => (
              <div key={index} className="mb-3 d-flex align-items-center">
                <img height="80" src={post.coverPhoto} />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">{post.title}</a>
                  </h2>
                  <div className="card-text text-muted small">
                    {post.author.username}
                  </div>
                  <small className="text-muted">{new Date(post.createdAt).toDateString()} &middot; {post.readingTimeInMins} min read</small>
                </div>
              </div>
            ))}

            <div className="mb-3 d-flex align-items-center">
              <img height="80" src="./assets/img/demo/blog5.jpg" />
              <div className="pl-3">
                <h2 className="mb-2 h6 font-weight-bold">
                  <a className="text-dark" href="./article.html">Underwater museum brings hope to Lake Titicaca</a>
                </h2>
                <div className="card-text text-muted small">
                  Jake Bittle in LOVE/HATE
                </div>
                <small className="text-muted">Dec 12 &middot; 5 min read</small>
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
                <small className="text-muted">Dec 12 &middot; 5 min read</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentPosts;