import React from "react";

// Import components
import SmallArticle from "./SmallArticle";
import ArticleSlider from "./ArticleSlider";
import LargeArticle from "./LargeArticle";

class ArticleWrapper extends React.Component {

  render() {

    const { article } = this.props;

    return(
      <div className="article-wrap">
        {article.relatedArticles.length === 0 &&
          <SmallArticle article={article} />
        }
        {article.relatedArticles.length !== 0 &&
          <ArticleSlider article={article} />
        }
      </div>
    )
  }
}

export default ArticleWrapper;