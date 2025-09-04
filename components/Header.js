// Import library functionality
import React, { useState, useEffect } from 'react';

// import custom functionality
import { useDarkMode } from '../utils/useDarkMode.ts';

// Import components
import Head from 'next/head';
import Link from 'next/link';

export default function Header(props) {

  const { loading, refresh, sections, selected, setSelected } = props;
  const [showHeader, setShowHeader] = useState(false);
  const { prefersDarkMode } = useDarkMode();

  // Function to toggle the drop shadow for the header if scrolled below the absolute top
  const toggleDropShadow = (e)=> {
    const header = document.getElementsByTagName('header')[0];
    let scroll = document.getElementsByTagName('body')[0].scrollTop;
    if (scroll >= 5) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
  }

  // useEffect on first render to bind the drop shadow toggler to scroll and fade in the header
  useEffect(() => {
    window.addEventListener('scroll', toggleDropShadow, true);
    setTimeout(()=> {
      setShowHeader(true);
    }, 250)
  }, [])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/icon/favicon-16x16.png" />
        <link rel="mask-icon" href="//safari-pinned-tab.svg" color="#734099" />
        <meta name="msapplication-TileColor" content="#734099" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <title>The Center Feed</title>
      </Head>
      <header className={showHeader ? 'app-header show' : 'app-header'}>
      <div className="logo">
        <Link href="/">
          <img src={prefersDarkMode ? '/img/logo-dark.svg' : '/img/logo.svg'} alt="The Center Feed Logo" />
          <h1 className="sr-only">The Center Feed</h1>
        </Link>
      </div>
      {!loading &&
        <div className="refresh">
          <button onClick={refresh}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.975 20.2Q8.55 20.2 6.163 17.812Q3.775 15.425 3.775 12Q3.775 8.575 6.163 6.187Q8.55 3.8 11.975 3.8Q13.75 3.8 15.363 4.525Q16.975 5.25 18.125 6.625V3.8H20.225V11.1H12.925V9H17.1Q16.3 7.625 14.938 6.85Q13.575 6.075 11.975 6.075Q9.5 6.075 7.775 7.8Q6.05 9.525 6.05 12Q6.05 14.475 7.775 16.2Q9.5 17.925 11.975 17.925Q13.875 17.925 15.4 16.85Q16.925 15.775 17.55 14H19.925Q19.225 16.725 17.013 18.462Q14.8 20.2 11.975 20.2Z"/></svg>
          </button>
        </div>
      }
      <div className="navigation">
        <ul>
          <li><button onClick={() => setSelected(sections)} className={selected.length > 1 ? 'active' : ''}>All</button></li>
          {sections.map((s) => (
            <li key={`nav-${s}`}><button onClick={() => setSelected([s])} className={selected.length === 1 && selected[0] === s ? 'active' : ''}>{s === 'US' ? 'U.S' : s}</button></li>
          ))}
        </ul>
      </div>
    </header>
    </>
  )
}