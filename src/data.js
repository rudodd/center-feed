import secrets from "./secrets";
import { commonWordArray, specialCharacters } from './data_sets/dataSets';

class Data {

  /**
   * Get Sources Method
   * @returns object with an two array.  An array of IDs and an array of sources with all available data
   */

  getSources() {
    const bannedSources = ['mtv-news', 'fox-news', 'the-washington-post', 'google-news', 'national-geographic'];
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

    // Get Allsides Media Sources
    // For use until API issue with AllSides is resolved - JSON file is in 'public' directory
    //// return fetch(`https://www.allsides.com/media-bias/json/noncommercial/publications`)
    return fetch('TEMPSources.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(allSidesData => {

      // Get News API Sources
      return fetch(`https://newsapi.org/v2/sources?apiKey=${secrets.newsApi.key}`)
      .then(response => response.json())
      .then(newsAPIData => {
        return filterSources(allSidesData, newsAPIData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  /**
   * Get News Method
   * @returns an array of news artical objects for use in the UI.
   */

  getNews() {

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


    return this.getSources().then((sources)=> {
      let sourceString = sources.ids.join(',');
      return fetch(`https://newsapi.org/v2/top-headlines?sources=${sourceString}&apiKey=${secrets.newsApi.key}&pageSize=100`)
      .then(response => response.json())
      .then(data => {
        return groupArticles(data.articles);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }
}

export default Data;