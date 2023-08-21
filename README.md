# The Center Feed

The center feed is an app designed for mobile use that displays current news from only center leaning, center-left leaning and center-right leaning news organizations.  It does this by fetching the current news from [NewsAPI](https://newsapi.org/) and filtering it down to only the news organizations that are rated as center, center-left, or center-right by [All Sides Media](https://www.allsides.com/).

Live app (designed for use on mobile): [centerfeed.org](https://www.centerfeed.com)

__NOTE:__ Unfortunately NewsAPI changed their API's free plan to only return articles on a 24 hour delay, which used to be a 15 minute delay.  I have not found a suitable free substitute, but would love any suggestions.

## Features
- Real time news articles from center leaning sources (as mentioned above, this is now on a 24 hour delay)
- Related article grouping and hot topic indication
- Link on each article to information regarding how the article's source leans

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses minimal additional npm packages, but those used are as follows:
- [Slick Carousel](https://www.npmjs.com/package/slick-carousel) - Used for the mobile friendly slider for related articles

To run the development server:

```bash
npm ci
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
