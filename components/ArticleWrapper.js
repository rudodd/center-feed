// Import library functionality
import React from "react";

// Import components
import SmallArticle from "./SmallArticle";
import ArticleSlider from "./ArticleSlider";

export default function ArticleWrapper(props){

  const { article, sources } = props;
  const source = sources.verbose.filter(source => source.id === article.source.id)[0];

  return (
    <div className="article-wrap">
      {article.relatedArticles.length === 0 &&
        <SmallArticle article={article} source={source} />
      }
      {article.relatedArticles.length !== 0 &&
        <ArticleSlider article={article} sources={sources} />
      }
    </div>
  )
}