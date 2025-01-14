// import library functionality
import React from 'react';

// import components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';

export default function Article(props) {
  const { article } = props;

  return (
    <Card className="article" elevation={0}>
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
              <p>Source bias rating: <Link className={article.bias} href={article.asmLink} target="_blank">
                {article.bias === 'left-center' ? 'Leans left' : article.bias === 'right-center' ? 'Leans right' : 'Center'}
              </Link></p>
            </div>
          </CardContent>
        </Box>
      </Link>
    </Card>
  )
}