import React from "react";
import Slider from "react-slick";

// Import components
import LargeArticle from "./LargeArticle";

class ArticleSlider extends React.Component {

  render() {

    const slickSettings = {
      dots: true,
      arrows: false,
      mobileFirst: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { article, sources } = this.props;
    const hot = article.relatedArticles.length > 2 ? true : false;

    // Limit related articles to 8 to keep bullets from wrapping
    const limitedRelatedArticles = article.relatedArticles.filter((article, key)=> {
      return (key <= 8) ? true : false;
    });

    return (
      <Slider {...slickSettings}>
        <LargeArticle key={article.id} article={article} sources={sources} hot={hot} />
        { limitedRelatedArticles.map((article)=> (
          <LargeArticle key={article.id} article={article} sources={sources} hot={hot} />
        ))}
      </Slider>
    )
  }
}

export default ArticleSlider; 