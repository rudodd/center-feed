// import library functionality
import { useState, useEffect } from 'react';

// import custom functionality
import { empty } from './helpers';

export default function useData() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sources, setSources] = useState([]);
  const sections = ['US', 'Business', 'Technology', 'World', 'Health', 'Science', 'Sports', 'Entertainment'];

  useEffect(() => {
    console.log(sources);
  }, [sources])

  const fetchData = () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const newsObj = {};
    fetch('/api/news')
      .then((res) => res.json())
      .then((res) => {
        sections.forEach((s) => {
          const filteredNews = res[s].filter((article) => {
            const bias = sources.find((source) => source.name.toLowerCase() === article.source.toLowerCase())?.bias;
            return (bias === 'left-center' || bias === 'right-center' || bias === 'center')
          }).map((article) => {
            const sourceMatch = sources.find((source) => source.name.toLowerCase() === article.source.toLowerCase());
            const bias = sourceMatch?.bias;
            const asmLink = sourceMatch?.allsidesurl;
            return {...article, 'bias': bias, 'asmLink': asmLink}
          })
          newsObj[s] = filteredNews;
        })
        setData(newsObj);
        setTimeout(() => {
          setIsLoading(false);
        }, 750);
      });
  }

  const fetchSources = () => {
    fetch('/api/all-sides-sources')
      .then((res) => res.json())
      .then((res) => setSources(res));
  }

  useEffect(() => {
    if (!empty(sources)) {
      fetchData();
    }
  }, [sources])

  useEffect(() => {
    fetchSources();
  }, [])

  return { isLoading, data, sections, fetchData }
}