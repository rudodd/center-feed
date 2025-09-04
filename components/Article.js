// import library functionality
import React from 'react';

// import components
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import { Card, CardSection } from '@guwmi/ui';
import Link from 'next/link';

export default function Article(props) {
  const { article } = props;

  return (
    <Card
      image={article.og}
      imageAlt={article.title}
      imageHeight={185}
      className="article"
    >
      <CardSection>
        <Link href={article.link} target="_blank" rel="noreferrer">
          <div className="source">
            <img
              style={{ width: 20 }}
              src={article.source_icon}
              alt={article.source}
            />
            <p>{article.source}</p>
          </div>
          <div className="title">
            <p>{article.title}</p>
          </div>
        </Link>
      </CardSection>
      <CardSection>
        <div className="bias">
          <p>Source bias rating: <Link className={article.bias} href={article.asmLink} target="_blank">
            {article.bias === 'left-center' ? 'Leans left' : article.bias === 'right-center' ? 'Leans right' : 'Center'}
          </Link></p>
        </div>
      </CardSection>
    </Card>
  )
}