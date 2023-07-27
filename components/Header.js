import React from 'react';

import Head from 'next/head';

class Header extends React.Component {

  state = {
    showHeader: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleDropShadow, true);
    setTimeout(()=> {
      this.setState({showHeader: true})
    }, 250)
  }

  toggleDropShadow = (e)=> {
    const header = document.getElementsByTagName('header')[0];
    let scroll = document.getElementsByTagName('body')[0].scrollTop;
    if (scroll >= 5) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
  }


  render() {

    const { loading, refresh } = this.props;

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
        <header className={this.state.showHeader ? 'app-header show' : 'app-header'}>
        <div className="logo">
          <a href="/">
            <img src="/img/logo.svg" alt="The Center Feed Logo"/>
            <h1 className="sr-only">The Center Feed</h1>
          </a>
        </div>
        {!loading &&
          <div className="refresh">
            <button onClick={refresh}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.975 20.2Q8.55 20.2 6.163 17.812Q3.775 15.425 3.775 12Q3.775 8.575 6.163 6.187Q8.55 3.8 11.975 3.8Q13.75 3.8 15.363 4.525Q16.975 5.25 18.125 6.625V3.8H20.225V11.1H12.925V9H17.1Q16.3 7.625 14.938 6.85Q13.575 6.075 11.975 6.075Q9.5 6.075 7.775 7.8Q6.05 9.525 6.05 12Q6.05 14.475 7.775 16.2Q9.5 17.925 11.975 17.925Q13.875 17.925 15.4 16.85Q16.925 15.775 17.55 14H19.925Q19.225 16.725 17.013 18.462Q14.8 20.2 11.975 20.2Z"/></svg>
            </button>
          </div>
        }
      </header>
      </>
    )
  }
}

export default Header;