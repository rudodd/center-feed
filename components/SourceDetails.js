import React from "react";

class SourceDetails extends React.Component {

  render() {

    const { source } = this.props;
    const sourceLogo = `/img/sources/${source.id}.png`;
    let leanClass;
    let leanText;
    switch(source.lean) {
      case 'Lean Left':
        leanClass = 'left';
        leanText = 'Center Left'
        break;
      case 'Lean Right':
        leanClass = 'right';
        leanText = 'Center Right';
        break;
      default:
        leanClass = 'center';
        leanText = 'Center';
    }

    return (
      <div className="source-details">
        <div className="source-logo">
          <a href={ source.url } target="_blank" rel="noreferrer">
          <img src={ sourceLogo } alt={ source.name } />
          </a>
        </div>
        <div className="lean-info">
          <a href={ source.allSidesURL } target="_blank" rel="noreferrer">Source leans: <span className={ leanClass }>{ leanText }</span></a>
        </div>
      </div>
    )
  }
}

export default SourceDetails;