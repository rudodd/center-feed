import { isStorageSource } from "@aws-amplify/predictions";
import React from "react";
import ArticleWrapper from "./ArticleWrapper";

class SmallArticle extends React.Component {

  render() {

    const { article, source } = this.props;
    const sourceLogo = `/img/sources/${source.id}.png`;
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
    let leanClass = 'center';
    let leanText = 'Center';
    switch(source.lean) {
      case 'Lean Left':
        leanClass = 'left';
        leanText = 'Center Left'
        break;
      case 'Lean Right':
        leanClass = 'right';
        leanText = 'Center Right';
        break;
    }

    return (
      <div className="small-article">
        <a href={article.url}>
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
          <div className="source-details">
            <div className="source-logo">
              <img src={ sourceLogo } alt={ source.name } />
            </div>
            <div className="lean-info">
              <a href={ source.allSidesURL }>Source leans: <span className={ leanClass }>{ leanText }</span></a>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default SmallArticle;