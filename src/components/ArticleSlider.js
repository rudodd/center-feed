import React from "react";
import Slider from "react-slick";

// Import components
import LargeArticle from "./LargeArticle";

class ArticleSlider extends React.Component {

  render() {

    const slickSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { article } = this.props;

    return(
      <Slider {...slickSettings}>
        <LargeArticle key={article.id} article={article} />
        { article.relatedArticles.map((article)=> (
          <LargeArticle key={article.id} article={article} />
        ))}
      </Slider>
    )
  }
}

export default ArticleSlider; 