// import library functionality
import React from 'react';

// import components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function ArticleSkeleton() {

  return (
    <Card className="article" elevation={0}>
        <Skeleton variant="rectangular" height={175} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="source">
              <Skeleton variant="circular" height={20} width={20} />
              <p><Skeleton variant="rounded" width={50} /></p>
            </div>
            <div className="title">
              <p>
              <Skeleton variant="rounded" sx={{marginBottom: '0.5rem'}} />
              <Skeleton variant="rounded" width="80%" />
              </p>
            </div>
            <div className="bias">
              <p><Skeleton variant="rounded" width={75} height={12} /></p>
            </div>
          </CardContent>
        </Box>
    </Card>
  )
}