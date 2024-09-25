import { useState, useEffect } from 'react';

export default function useData() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sources, setSources] = useState([]);
  const sections = ['US', 'Business', 'Technology', 'World', 'Health', 'Science', 'Sports', 'Entertainment'];

  const fetchData = () => {
    const newsObj = {};
    fetch('/api/news')
      .then((res) => res.json())
      .then((res) => {
        sections.forEach((s) => {
          const filteredNews = res[s].filter((article) => {
            const bias = sources.find((source) => source.name.toLowerCase() === article.source.toLowerCase())?.bias;
            return (bias === 'left-center' || bias === 'right-center' || bias === 'center')
          }).map((article) => {
            const bias = sources.find((source) => source.name.toLowerCase() === article.source.toLowerCase())?.bias;
            return {...article, ['bias']: bias}
          })
          newsObj[s] = filteredNews;
        })
        setData(newsObj);
        setIsLoading(false);
      });
  }

  const fetchSources = () => {
    fetch('/api/all-sides-sources')
      .then((res) => res.json())
      .then((res) => setSources(res));
  }

  useEffect(() => {
    if (sources.length) {
      fetchData();
    }
  }, [sources])

  useEffect(() => {
    fetchSources();
  }, [])

  return { isLoading, data, sections, fetchData }
}