import { NextComponentType } from "next"
import { FC } from 'react';
import { Article } from "../types";
import Link from 'next/link';
const marked = require('marked');

type _Article = {
  article: Article
} 

const Header: FC<_Article> = ({ article }) => {
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid mb-3 pt-0 pb-0 bg-lightblue position-relative">
        <div className="pl-4 pr-0 h-100 tofront">
          <div className="row justify-content-between">
            <div className="col-md-6 pt-6 pb-6 align-self-center">
              <h1 className="secondfont mb-3 font-weight-bold">{article.title}</h1>
              <p className="mb-3" dangerouslySetInnerHTML={{ __html: marked.marked(article.description) }}>
        
              </p>
              <Link href={`/post/${article.id}`} className="btn btn-dark">Read More</Link>
            </div>
            <div className="col-md-6 d-none d-md-block pr-0" style={{ backgroundSize : 'cover', backgroundImage :`url(${article.coverPhoto})` }}>	</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;