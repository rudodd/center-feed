import React from "react";
import Link from 'next/link';


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
          <Link href={ source.url } target="_blank" rel="noreferrer">
          <img src={ sourceLogo } alt={ source.name } />
          </Link>
        </div>
        <div className="lean-info">
          <Link href={ source.allSidesURL } target="_blank" rel="noreferrer">Source leans: <span className={ leanClass }>{ leanText }</span></Link>
        </div>
      </div>
    )
  }
}

export default SourceDetails;