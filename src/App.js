import React from 'react';
import './dist/css/app.css';

// Import the data class
import Data from './data';

class App extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount() {

    // initialize data object
    const data = new Data();
    data.getNews().then((articles) => {
      data.getSources().then((sources) => {
        this.setState({
          loading: false,
          sources: sources,
          articles: articles,
        });
      })
    });
  }

  render() {

    console.log(this.state.articles);
    
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