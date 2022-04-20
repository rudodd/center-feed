import secrets from "./secrets";
import { commonWordArray, specialCharacters } from './data_sets/dataSets';
import { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { listFeeds } from './graphql/queries';
import { createFeed, updateFeed } from './graphql/mutations';

// Configure the Amplify object
API.configure(awsconfig);

class Data {

  /**
   * Get Sources Method
   * @returns object with an two array.  An array of IDs and an array of sources with all available data
   */

  getSources() {
    const bannedSources = ['mtv-news','fox-news','the-washington-post','google-news','national-geographic'];
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
    return API.get('mainappapi', '/feed/allSidesSources')
    .then(allSidesData => {

      // Get News API Sources
      return API.post('mainappapi', '/feed/newsAPISources', { body: { key: secrets.newsApi.key }})
      .then(newsAPIData => {
        return filterSources(JSON.parse(allSidesData.data), JSON.parse(newsAPIData.data));
      })
      .catch((error) => {
        console.error('Error fetching NewsAPI sources:', error);
      });
    })
    .catch((error) => {
      console.error('Error fetching AllSides Media sources:', error);
    });
  }
  
  /**
   * Get News Method
   * @returns an array of news artical objects for use in the UI.
   */

  async getNews() {

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
      return API.post('mainappapi', '/feed/newsAPIArticles', {
        body: {
          sources: sourceString,
          key: secrets.newsApi.key,
        }
      })
      .then(response => JSON.parse(response.data))
      .then(data => {
        return groupArticles(data.articles);
      })
      .catch((error) => {
        console.error('Error fetching NewsAPI articles:', error);
      });
    });
  }

  /**
   * Get Data Method
   * @returns an object with both sources and articles from wither cache or current API endpoints
   */
  async getData() {
    let dataObj;

    // Fetch or create feed data in GraphQL DB
    return API.graphql({ query: listFeeds }).then((apiData)=> {

      // Create data in DB if it doesn't exist - this is a fallback in case something happens to the existing data in the DB
      if (apiData.data.listFeeds.items.length < 1) {
        return this.getSources().then((sources)=> {
          return this.getNews().then((articles)=> {
            dataObj = {
              timestamp: Date.now(),
              articles: JSON.stringify(articles),
              sources: JSON.stringify(sources),
            }
            return API.graphql({ query: createFeed, variables: { input: dataObj } }).then(()=> {
              return dataObj;
            });
          })
        });
      } else {
        const id = apiData.data.listFeeds.items[0].id;
        const createdTime = apiData.data.listFeeds.items[0].timestamp;

        // If the data is stale (older than 15 minutes) then update it
        if ((new Date() - createdTime) > (60 * 1000 * 15)) {
          console.log('Fetching new data');
          return this.getSources().then((sources)=> {
            return this.getNews().then((articles)=> {
              dataObj = {
                id: id,
                timestamp: Date.now(),
                articles: JSON.stringify(articles),
                sources: JSON.stringify(sources),
              }
              return API.graphql({ query: updateFeed, variables: { input: dataObj } }).then(()=> {
                return dataObj;
              });
            })
            .catch(()=> {
              return apiData.data.listFeeds.items[0];
            });
          })
          .catch(()=> {
            return apiData.data.listFeeds.items[0];
          });
        }

        // Return the existing data from the DB
        else {
          return apiData.data.listFeeds.items[0];
        }
      }
    });
  }
}

export default Data;