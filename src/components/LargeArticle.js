import React from "react";

class LargeArticle extends React.Component {

  render() {

    const { article } = this.props;

    return(
      <div className="large-article">
        <p>{ article.title }</p>
      </div>
    )
  }
}

export default LargeArticle;