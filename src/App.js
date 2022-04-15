import React from 'react';
import Slider from "react-slick";

// Import styles
import './css/app.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the data class
import Data from './data';

class App extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount() {

    // Initialize data object, get the feed data, and set the state
    const data = new Data();
    data.getData().then((feed)=> {
      setTimeout(()=> {
        this.setState({
          loading: false,
          sources: JSON.parse(feed.sources),
          articles: JSON.parse(feed.articles),
        });
      }, 1500)
    })
  }

  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div className="App">
        {this.state.loading &&
          <h1>loading</h1>
        }
        {!this.state.loading &&
        <header className="App-header">
          {this.state.articles.map((article)=> (
            <li key={article.id}>{ article.title }</li>
          ))}
          <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </header>
        }
      </div>
    );
  } 
}

export default App;