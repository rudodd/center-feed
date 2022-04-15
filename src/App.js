import React from 'react';

// Import styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/app.css';

// Import components
import Header from './components/Header';
import ArticleWrapper from './components/ArticleWrapper';

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
    
    return (
      <div className="app">
        {this.state.loading &&
          <div className="app-container">
            <h1>loading</h1>
          </div>
        }
        {!this.state.loading &&
        <div className="app-container">
          <Header />
          {this.state.articles.map((article)=> (
            <ArticleWrapper key={article.id} article={article} />
          ))}
        </div>
        }
      </div>
    );
  } 
}

export default App;