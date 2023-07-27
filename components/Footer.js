import React from "react";

class Footer extends React.Component {

  state = {
    showAttribution: false,
  }

  render() {

    const year = new Date().getFullYear();

    const toggleAttribution = ()=> {
      this.setState({showAttribution: !this.state.showAttribution})
    }

    return (
      <footer>
        <p>
          &copy; Copyright {year} Rustin Dodd | Powered by <a href="https://newsapi.org/" target="_blank" rel="noreferrer">News API</a> and <a href="https://www.allsides.com/media-bias/media-bias-ratings" target="_blank" rel="noreferrer">AllSides Media Bias Ratings<sup>TM</sup></a>.
          <button onClick={toggleAttribution}>See full attribution</button>
        </p>
        {this.state.showAttribution &&
          <p><a href="https://www.allsides.com/media-bias/media-bias-ratings" target="_blank" rel="noreferrer">AllSides Media Bias Ratings</a>™ by <a target="_blank" href="https://www.allsides.com/unbiased-balanced-news" rel="noreferrer">AllSides.com</a> are licensed under a <a href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution-NonCommercial 4.0 International License</a>. These ratings may be used for research or noncommercial purposes with attribution.</p>
        }
      </footer>
    )
  }
}

export default Footer;