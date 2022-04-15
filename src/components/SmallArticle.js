import React from "react";
import ArticleWrapper from "./ArticleWrapper";

class SmallArticle extends React.Component {

  render(){

    const { article } = this.props;

    return(
      <div className="small-article"><p>{article.title}</p></div>
    )
  }
}

export default SmallArticle;