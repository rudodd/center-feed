import secrets from "./secrets";
import { empty } from './helpers';
import { commonWordArray, specialCharacters } from './data_sets/dataSets';

class Data {

  /**
   * Get Sources Method
   * @returns object with an two array.  An array of IDs and an array of sources with all available data
   */

  getSources() {
    const bannedSources = ['mtv-news','fox-news','the-washington-post','google-news','national-geographic', 'techcrunch']; // Removed some for just poor quality stories
    const cleanURL = (url) => {
      return url.replaceAll('/', '').replace('/', '').replace('https', 'http');
    }

    const filterSources = (allSidesData, newsAPIData) => {

      // Filter All Sides sources
      const ASSources = allSidesData.allsides_media_bias_ratings;
      const ASNewsSources = ASSources.filter((item)=> { return item.publication.source_type === 'News Media' });
      const ASCenterSources = ASNewsSources.filter((item)=> { return item.publication.media_bias_rating === 'Lean Left' || item.publication.media_bias_rating === 'Lean Right' || item.publication.media_bias_rating === 'Center'
       });

      // Compare filtered All Sides sources with News API sources
      const NASources = newsAPIData.sources;
      const matchingSources = NASources.filter((NASource) => {
        let include = false;
        ASCenterSources.forEach((ASSource)=> {
          if (NASource.country === 'us' && !bannedSources.includes(NASource.id) && typeof NASource.url !== 'undefined' && typeof ASSource.publication.source_url !== 'undefined') {
            if (cleanURL(NASource.url) === cleanURL(ASSource.publication.source_url)) {
              include = true;
              return;
            }
          }
        });
        return include;
      });
      const mergedSources = matchingSources.map((item) => {
        let source;
        ASCenterSources.forEach((ASSource) => {
          if (cleanURL(item.url) === cleanURL(ASSource.publication.source_url)) {
            source = {
              id: item.id,
              name: item.name,
              description: item.description,
              url: item.url,
              allSidesURL: ASSource.publication.allsides_url,
              lean: ASSource.publication.media_bias_rating,
            }
          }
        });
        return source;
      });
      const mergedSourceIDs = mergedSources.map((item) => { return item.id });
      return {
        ids: mergedSourceIDs,
        verbose: mergedSources,
      }
    }

    // Get all sources - first all sides medai, then news api 
    return fetch('/api/all-sides-sources')
      .then((res) => {
        if (res.ok) {
          return fetch(`/api/news-api-sources`, {method: 'POST', body: {key: secrets.newsApi.key}})
            .then((res) => {
              if (res.ok) {
                return filterSources(JSON.parse(allSidesData.data), JSON.parse(newsAPIData.data));
              } else {
                console.error('Error fetching NewsAPI sources:', res);
              }
            })
        } else {
          console.error('Error fetching AllSides Media sources:', res);
        }
      })
  }
  
  /**
   * Get News Method
   * @returns an array of news artical objects for use in the UI.
   */

  async getNews(sources) {

    // Helper function to change shape of data to account for related articles.
    const groupArticles = (articles) => {
      
      // Add keyword array to articles
      const emptyValues = ['', ' ', '-', ' - ', '/', ' / '];
      let keywordArray = articles.map((article, key)=> {
        let title = article.title;
        specialCharacters.forEach((char) => {
          title = title.replaceAll(char, '');
        });
        let titleArray = title.toLowerCase().split(' ').filter(word => !commonWordArray.includes(word)).filter(word => !emptyValues.includes(word));
        return {
          id: key,
          keywords: titleArray,
          ...article
        };
      });

      // Nest related articles inside original article object
      let IDsToRemove = [];
      let finalArray = keywordArray.map((article) => {
        let relatedIDArray = [];
        let relatedArticleArray = [];
        keywordArray.forEach((articleDepth) => {
          if (articleDepth.id > article.id) {
            let matches = article.keywords.filter(keyword => articleDepth.keywords.includes(keyword));
            if (matches.length >= 2) {
              relatedIDArray.push(articleDepth.id);
              relatedArticleArray.push(articleDepth);
              IDsToRemove.push(articleDepth.id);
            }
          }
        });
        if (IDsToRemove.includes(article.id)) {
          return null;
        } else {
          return {
            relatedIDs: relatedIDArray,
            relatedArticles: relatedArticleArray,
            ...article 
          }
        }
      }).filter(item => item !== null);
      return finalArray;
    }

    let sourceString = sources.ids.join(',');
    return fetch('/api/news', {method: 'POST', body: {key: secrets.newsApi.key, sources: sourceString}})
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              let currentArticles = data.articles.filter((article)=> {
                let currentTime = new Date();
                let articleTime = new Date(article.publishedAt);
                let difference = Math.round((currentTime - articleTime) / 1000 / 60);
                return difference < 4320 ? true : false;
              });
              return groupArticles(currentArticles);
            })
        } else {
          console.error('Error fetching NewsAPI articles:', res);
        }
      })
  }

  /**
   * Get Data Method
   * @returns an object with both sources and articles from wither cache or current API endpoints
   */
  async getData() {
    return this.getSources().then((sources)=> {
      if (!empty(sources)) {
        return this.getNews(sources).then((articles)=> {
          if (!empty(articles)) {
            return {
              timestamp: Date.now(),
              articles: JSON.stringify(articles),
              sources: JSON.stringify(sources),
            }
          }
        })
      }
    });
  }
}

export default Data;