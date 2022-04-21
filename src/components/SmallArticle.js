import React from "react";
import SourceDetails from "./SourceDetails";

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
        <a href={article.url} target="_blank" rel="noreferrer">
          <div className="article-details">
            <div className="article-img">
              <img src={ article.urlToImage } alt={ article.title } />
            </div>
            <div className="article-info">
              <div className="time">
                <p>{ publishedTime } ago</p>
              </div>
              <div className="title">
                <h2>{ article.title }</h2>  
              </div>
            </div>
          </div>
        </a>
        <SourceDetails source={source} />
      </div>
    )
  }
}

export default SmallArticle;