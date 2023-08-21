// Import library functionalty
import React from "react";

// Import custom functionality
import { getPublishedTime } from '../utils/helpers';

// Import components
import SourceDetails from "./SourceDetails";
import Link from 'next/link';

export default function SmallArticle(props) {

  const { article, source } = props;
  const publishedTime = getPublishedTime(article.publishedAt)

  return (
    <div className="small-article">
      <Link href={article.url} target="_blank" rel="noreferrer">
        <div className="article-details">
          {article.urlToImage && article.urlToImage !== 'null' &&
            <div className="article-img">
              <img src={ article.urlToImage ? article.urlToImage : '/img/no-img.jpg' } alt={ article.title } />
            </div>
          }
          <div className={article.urlToImage ? 'article-info' : 'article-info padded'}>
            <div className="time">
              <p>{ publishedTime } ago</p>
            </div>
            <div className="title">
              <h2>{ article.title }</h2>  
            </div>
          </div>
        </div>
      </Link>
      <SourceDetails source={source} />
    </div>
  )
}