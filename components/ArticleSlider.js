// import library functionality
import React from "react";
import Slider from "react-slick";

// import components
import LargeArticle from "./LargeArticle";

export default function ArticleSlider(props){

  const slickSettings = {
    dots: true,
    arrows: false,
    mobileFirst: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const { article, sources } = props;
  const hot = article.relatedArticles.length > 2 ? true : false;

  // Limit related articles to 7 to keep bullets from wrapping
  const limitedRelatedArticles = article.relatedArticles.filter((article, key) => (key <= 6));

  return (
    <Slider {...slickSettings}>
      <LargeArticle key={article.id} article={article} sources={sources} hot={hot} />
      { limitedRelatedArticles.map((article)=> (
        <LargeArticle key={article.id} article={article} sources={sources} hot={hot} />
      ))}
    </Slider>
  )
}