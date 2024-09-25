// import library functionality
import React, { useState, useEffect } from 'react';

// import custom functionality
import useData from '../utils/useData';

// import components
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading, sections } = useData();
  const [selected, setSelected] = useState(sections);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="app">
      <Header loading={isLoading} refresh={null}/>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="app-container">
          {selected.map((section) => (
            <>
              <div className="section-title">
                <h2>{section === 'US' ? 'U.S.' : section}</h2>
                <div></div>
              </div>
              {data[section].map((article, i) => (
                <Card key={`${section}-${i}`} className="article">
                  <CardMedia
                    component="img"
                    sx={{ height: 175 }}
                    image={article.og}
                    alt={article.title}
                  />
                  <Link href={article.link} target="_blank" rel="noreferrer">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div className="source">
                          <CardMedia
                            component="img"
                            sx={{ width: 20 }}
                            image={article.source_icon}
                            alt={article.source}
                          />
                          <p>{article.source}</p>
                        </div>
                        <div className="title">
                          <p>{article.title}</p>
                        </div>
                        <div className="bias">
                          <p>Source: <span className={article.bias}>
                            {article.bias === 'left-center' ? 'Leans left' : article.bias === 'Leans right' ? 'Right center' : 'Leans center'}
                          </span></p>
                        </div>
                      </CardContent>
                    </Box>
                  </Link>
                </Card>
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  )
}