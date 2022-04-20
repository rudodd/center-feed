import React from "react";

// Import components
import SmallArticle from "./SmallArticle";
import ArticleSlider from "./ArticleSlider";
import LargeArticle from "./LargeArticle";

class ArticleWrapper extends React.Component {

  render() {

    const { article, sources } = this.props;
    const source = sources.verbose.filter(source => source.id === article.source.id)[0];

    return(
      <div className="article-wrap">
        {article.relatedArticles.length === 0 &&
          <SmallArticle article={article} source={source} />
        }
        {article.relatedArticles.length !== 0 &&
          <ArticleSlider article={article} source={source} />
        }
      </div>
    )
  }
}

export default ArticleWrapper;