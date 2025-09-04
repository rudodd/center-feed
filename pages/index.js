// import library functionality
import React, { useState, useEffect, useRef } from 'react';

// import custom functionality
import useData from '../utils/useData';

// import components
import Header from '../components/Header';
import Article from '../components/Article';
import ArticleSkeleton from '../components/ArticleSkeleton';
// import Skeleton from '@mui/material/Skeleton';

export default function Home() {
  const { data, isLoading, sections, fetchData } = useData();
  const [selected, setSelected] = useState(sections);
  const prevSelected = useRef(selected);

  useEffect(() => {
    if (selected.length !== prevSelected.current.length || selected[0] !== prevSelected.current[0]) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      prevSelected.current = selected;
    }
  }, [selected])

  return (
    <div className="app">
      <Header loading={isLoading} refresh={fetchData} sections={sections} selected={selected} setSelected={setSelected} />
      <div className="app-container">
        {isLoading ? (
          <>
            <div className="section-title">
              {/* <h2><Skeleton variant="rounded" width={100} /></h2> */}
            </div>
            {[0,0,0,0,0].map((i, k) => (
              <ArticleSkeleton key={k} />
            ))}
          </>
        ) : (
          selected.map((section) => (
            <React.Fragment key={`${section}-wrap`}>
              <div className="section-title">
                <h2>{section === 'US' ? 'U.S.' : section}</h2>
              </div>
              {data[section].map((article, i) => (
                <Article key={`${section}-${i}`} article={article} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  )
}