import { NextComponentType } from "next"
import Link from "next/link";
import { FC } from 'react'
import { Article } from "../types";

type Posts = {
  allPosts: Article[],
  featuredPosts: Article[],
}

const OtherPosts: FC<Posts> = ({ allPosts, featuredPosts }) => {
  // console.log(allPosts)
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-md-8">
          <>
            <h5 className="font-weight-bold spanborder"><span>All Stories</span></h5>
            {
              allPosts.map((post, index) => (
                <div key={index} className="mb-3 d-flex justify-content-between">
                  <div className="pr-3">
                    <h2 className="mb-1 h4 font-weight-bold">
                      <Link className="text-dark" href={`/post/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p>
                      {post.description}
                    </p>
                    <div className="card-text text-muted small">
                      {post.author.username} 
                    </div>
                    <small className="text-muted">{new Date(post.createdAt).toDateString()} &middot; {Math.floor(post.readingTimeInMins)} min read</small>
                  </div>
                  { /* eslint-disable-next-line @next/next/no-img-element */ }
                  <img height="120" alt={post.title} src={post.coverPhoto} />
                </div>
              ))
            }

            
          </>
        </div>
        <div className="col-md-4 pl-4">
          <h5 className="font-weight-bold spanborder"><span>Popular</span></h5>
          <ol className="list-featured">
            { featuredPosts.map((post, index) => (
              <li key={index}>
                <span>
                  <h6 className="font-weight-bold">
                    <Link href={`/post/${post.id}`} className="text-dark">{post.title}</Link>
                  </h6>
                  <p className="text-muted">
                    {post.username}
                  </p>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
};

export default OtherPosts;