import React from 'react';
import './css/app.css';

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
      <div className="App">
        {this.state.loading &&
          <h1>loading</h1>
        }
        {!this.state.loading &&
        <header className="App-header">
          {this.state.articles.map((article)=> (
            <li key={article.id}>{ article.title }</li>
          ))}
        </header>
        }
      </div>
    );
  } 
}

export default App;