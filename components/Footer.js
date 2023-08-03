// import library functionality
import React, { useState } from "react";

// import components
import Link from 'next/link';

export default function Footer() {

  const year = new Date().getFullYear();
  const [showAttribution, setShowAttribution] = useState(false);

  const toggleAttribution = ()=> {
    setShowAttribution(!showAttribution)
  }

  return (
    <footer>
      <p>
        &copy; Copyright {year} Rustin Dodd | Powered by <Link href="https://newsapi.org/" target="_blank" rel="noreferrer">News API</Link> and <Link href="https://www.allsides.com/media-bias/media-bias-ratings" target="_blank" rel="noreferrer">AllSides Media Bias Ratings<sup>TM</sup></Link>.
        <button onClick={toggleAttribution}>See full attribution</button>
      </p>
      {showAttribution &&
        <p><Link href="https://www.allsides.com/media-bias/media-bias-ratings" target="_blank" rel="noreferrer">AllSides Media Bias Ratings</Link>™ by <Link target="_blank" href="https://www.allsides.com/unbiased-balanced-news" rel="noreferrer">AllSides.com</Link> are licensed under a <Link href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution-NonCommercial 4.0 International License</Link>. These ratings may be used for research or noncommercial purposes with attribution.</p>
      }
    </footer>
  )
}