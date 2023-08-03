import React, { useState, useEffect } from 'react';

// Import components
import Header from '../components/Header';
import ArticleWrapper from '../components/ArticleWrapper';
import Footer from '../components/Footer';

// Import the data class
import Data from '../data';
import { empty } from '../helpers';

export default function Home() {

  const data = new Data();
  const [loading, setLoading] = useState(true);
  const [hideNotification, setHideNotification] = useState(false);
  const [sources, setSources] = useState(null);
  const [articles, setArticles] = useState(null);

  const getData = () => {
    if (!loading) {
      setLoading(true);
    }
    data.getData()
      .then((feed)=> {
        setSources(JSON.parse(feed.sources));
        setArticles(JSON.parse(feed.articles));
      });
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if (!empty(sources) && !empty(articles)) {
      setLoading(false);
    }
  })
    
  return (
    <div className="app">
      <Header loading={loading} refresh={getData}/>
      {!hideNotification &&
        <div className="desktop-notification">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
          <p>This app was designed for mobile.  For the best experience, visit this site on a mobile device.</p>
          <button className="notification-close" onClick={setHideNotification(true)}>&#x2715;</button>
        </div>
      }
      {loading &&
        <div className="loading-container">
          <img src="/img/loading.gif" alt="loading" />
        </div>
      }
      {!loading &&
        <div className="app-container">
          {articles.map((article)=> (
            <ArticleWrapper key={article.id} article={article} sources={sources} />
          ))}
        </div>
      }
      {!loading &&
        <Footer/>
      }
    </div>
  );
}