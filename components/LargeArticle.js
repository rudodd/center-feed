// Import library functionality
import React from "react";

// Import custom functionality
import { getPublishedTime } from '../utils/helpers';

// Import components
import SourceDetails from "./SourceDetails";
import Link from 'next/link';

export default function LargeArticle(props) {

  const { article, sources, hot } = props;
  const source = sources.verbose.filter(source => source.id === article.source.id)[0];
  const publishedTime = getPublishedTime(article.publishedAt)

  return (
    <div className="large-article">
      <Link href={article.url} target="_blank" rel="noreferrer">
        <div className="article-img">
          <img src={ (article.urlToImage && article.urlToImage !== 'null') ? article.urlToImage : '/img/no-img.jpg' } alt={ article.title } />
        </div>
        {hot &&
          <div className="hot-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><path d="M19.48,12.35c-1.57-4.08-7.16-4.3-5.81-10.23c0.1-0.44-0.37-0.78-0.75-0.55C9.29,3.71,6.68,8,8.87,13.62 c0.18,0.46-0.36,0.89-0.75,0.59c-1.81-1.37-2-3.34-1.84-4.75c0.06-0.52-0.62-0.77-0.91-0.34C4.69,10.16,4,11.84,4,14.37 c0.38,5.6,5.11,7.32,6.81,7.54c2.43,0.31,5.06-0.14,6.95-1.87C19.84,18.11,20.6,15.03,19.48,12.35z M10.2,17.38 c1.44-0.35,2.18-1.39,2.38-2.31c0.33-1.43-0.96-2.83-0.09-5.09c0.33,1.87,3.27,3.04,3.27,5.08C15.84,17.59,13.1,19.76,10.2,17.38z"/></g></svg>
          </div>
        }
      </Link>
      <div className="article-details">
        <Link href={article.url} target="_blank" rel="noreferrer">
          <div className="article-info">
            <div className="time">
              <p>{ publishedTime } ago</p>
            </div>
            <div className="title">
              <h2>{ article.title }</h2>  
            </div>
          </div>
        </Link>
        <SourceDetails source={source} />
      </div>
    </div>
  )
}