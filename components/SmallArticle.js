import React from "react";
import SourceDetails from "./SourceDetails";
import Link from 'next/link';
import Image from 'next/image';

class SmallArticle extends React.Component {

  render() {

    const { article, source } = this.props;
    let publishedTime = '0 minutes';
    let currentTime = new Date();
    let articleTime = new Date(article.publishedAt);
    let difference = Math.round((currentTime - articleTime) / 1000 / 60);
    if (difference < 60) {
      publishedTime = `${difference} minutes`;
    } else if ((difference / 60) <= 1.5) {
      publishedTime = "1 hour";
    } else if ((difference / 60) <= 24) {
      publishedTime = `${Math.round(difference / 60)} hours`;
    } else if (((difference / 60) / 24) <= 1.5) {
      publishedTime = '1 day';
    } else {
      publishedTime = `${Math.round((difference / 60) / 24)} days`;
    }

    return (
      <div className="small-article">
        <Link href={article.url} target="_blank" rel="noreferrer">
          <div className="article-details">
            {article.urlToImage && article.urlToImage !== 'null' &&
              <div className="article-img">
                <Image src={ article.urlToImage ? article.urlToImage : '/img/no-img.jpg' } alt={ article.title } />
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
}

export default SmallArticle;